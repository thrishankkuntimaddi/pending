/**
 * useBlockTree — Builds a nested tree from a flat blocks array
 * and computes aggregated costs for each node.
 */
export const buildTree = (blocks, parentId = null) => {
  return blocks
    .filter((b) => (b.parentId ?? null) === parentId)
    .map((b) => ({
      ...b,
      children: buildTree(blocks, b.id),
    }));
};

/**
 * Recursively sum cost of a node and all its descendants.
 */
export const aggregateCost = (node) => {
  const selfCost = Number(node.cost) || 0;
  if (!node.children || node.children.length === 0) return selfCost;
  const childCost = node.children.reduce(
    (sum, child) => sum + aggregateCost(child),
    0
  );
  return selfCost + childCost;
};

/**
 * Compute total cost across all root blocks (flat list).
 */
export const computeTotalCost = (blocks) => {
  return blocks.reduce((sum, b) => sum + (Number(b.cost) || 0), 0);
};

/**
 * Get all ancestors of a block (ordered from root to parent).
 */
export const getAncestors = (blockId, allBlocks) => {
  const ancestors = [];
  let current = allBlocks.find((b) => b.id === blockId);
  while (current && current.parentId) {
    const parent = allBlocks.find((b) => b.id === current.parentId);
    if (!parent) break;
    ancestors.unshift(parent);
    current = parent;
  }
  return ancestors;
};

/**
 * Get direct children of a block.
 */
export const getChildren = (blockId, allBlocks) => {
  return allBlocks.filter((b) => b.parentId === blockId);
};

/**
 * Count completed children vs total children for progress calc.
 */
export const getProgress = (blockId, allBlocks) => {
  const children = getChildren(blockId, allBlocks);
  if (children.length === 0) return null;
  const completed = children.filter((b) => b.status === "completed").length;
  return { completed, total: children.length };
};
