import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useBlocks } from "../contexts/BlocksContext";
import { getAncestors } from "../hooks/useBlockTree";
import Breadcrumb from "../components/layout/Breadcrumb";
import BlockRow from "../components/blocks/BlockRow";
import BlockForm from "../components/blocks/BlockForm";
import { StatusBadge, CategoryBadge } from "../components/blocks/StatusBadge";
import Loader from "../components/ui/Loader";

const formatCost = (n) => {
  if (!n && n !== 0) return null;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${Number(n).toLocaleString("en-IN")}`;
};

const BlockView = () => {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const { blocks, loading, getBlock, getBlockChildren, getAggregatedCost, deleteBlock } = useBlocks();

  const [addSubOpen, setAddSubOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const block = getBlock(blockId);
  const children = getBlockChildren(blockId);
  const ancestors = getAncestors(blockId, blocks);
  const aggCost = getAggregatedCost(blockId);
  const completedChildren = children.filter((b) => b.status === "completed").length;

  if (loading) return <Loader />;

  if (!block) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2 className="empty-state-title">Block not found</h2>
          <p className="empty-state-desc">This block may have been deleted.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${block.title}" and all its sub-blocks?`)) return;
    setDeleting(true);
    await deleteBlock(blockId);
    navigate(block.parentId ? `/block/${block.parentId}` : "/");
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <Breadcrumb ancestors={ancestors} current={block} />

      {/* Block Header Card */}
      <motion.div
        className="block-view-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
          <h1 className="block-view-title">{block.title || "Untitled"}</h1>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="btn btn-ghost" onClick={() => setEditOpen(true)}>
              ✏️ Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              🗑 Delete
            </button>
          </div>
        </div>

        {block.description && (
          <p className="block-view-desc">{block.description}</p>
        )}

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          <StatusBadge status={block.status} />
          {block.category && <CategoryBadge category={block.category} />}
        </div>

        {/* Stats */}
        <div className="block-view-stats">
          <div className="block-stat">
            <div className="block-stat-label">Own Cost</div>
            <div className="block-stat-value">
              {block.cost ? formatCost(block.cost) : "—"}
            </div>
          </div>
          {aggCost !== (block.cost || 0) && (
            <div className="block-stat">
              <div className="block-stat-label">Total (inc. sub-blocks)</div>
              <div className="block-stat-value accent">{formatCost(aggCost)}</div>
            </div>
          )}
          <div className="block-stat">
            <div className="block-stat-label">Sub-blocks</div>
            <div className="block-stat-value">{children.length}</div>
          </div>
          {children.length > 0 && (
            <div className="block-stat">
              <div className="block-stat-label">Completed</div>
              <div className="block-stat-value">
                {completedChildren} / {children.length}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sub-blocks Section */}
      <div>
        <div className="block-section-header">
          <span className="block-section-title">
            Sub-blocks ({children.length})
          </span>
          <button
            className="btn btn-primary"
            onClick={() => setAddSubOpen(true)}
            id="add-subblock-btn"
          >
            ＋ Add Sub-block
          </button>
        </div>

        {children.length === 0 ? (
          <motion.div
            className="empty-state"
            style={{ padding: "48px 24px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">No sub-blocks yet</h3>
            <p className="empty-state-desc">
              Break this vision down into smaller components, ideas or steps.
            </p>
            <button className="btn btn-primary" onClick={() => setAddSubOpen(true)}>
              ＋ Add First Sub-block
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="block-list">
              {children.map((child) => (
                <BlockRow key={child.id} block={child} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Modals */}
      <BlockForm
        isOpen={addSubOpen}
        onClose={() => setAddSubOpen(false)}
        parentId={blockId}
      />
      <BlockForm
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        editBlock={block}
      />
    </div>
  );
};

export default BlockView;
