import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  subscribeToBlocks,
  addBlock as fbAddBlock,
  updateBlock as fbUpdateBlock,
  deleteBlock as fbDeleteBlock,
} from "../firebase/blocks";
import { computeTotalCost, getProgress, aggregateCost, getChildren } from "../hooks/useBlockTree";

const BlocksContext = createContext(null);

export const BlocksProvider = ({ children }) => {
  const { user } = useAuth();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBlocks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeToBlocks(user.uid, (data) => {
      setBlocks(data);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const addBlock = useCallback(
    async (blockData) => {
      if (!user) return;
      await fbAddBlock(user.uid, {
        title: "",
        description: "",
        cost: null,
        category: "General",
        status: "idea",
        parentId: null,
        ...blockData,
      });
    },
    [user]
  );

  const updateBlock = useCallback(
    async (blockId, data) => {
      if (!user) return;
      await fbUpdateBlock(user.uid, blockId, data);
    },
    [user]
  );

  const deleteBlock = useCallback(
    async (blockId) => {
      if (!user) return;
      await fbDeleteBlock(user.uid, blockId, blocks);
    },
    [user, blocks]
  );

  // Derived values
  const totalCost = computeTotalCost(blocks);
  const rootBlocks = blocks.filter((b) => !b.parentId);

  // Get aggregated cost for a block node using flat array
  const getAggregatedCost = useCallback(
    (blockId) => {
      const computeRecursive = (id) => {
        const block = blocks.find((b) => b.id === id);
        if (!block) return 0;
        const selfCost = Number(block.cost) || 0;
        const childrenCost = blocks
          .filter((b) => b.parentId === id)
          .reduce((sum, child) => sum + computeRecursive(child.id), 0);
        return selfCost + childrenCost;
      };
      return computeRecursive(blockId);
    },
    [blocks]
  );

  const getBlockProgress = useCallback(
    (blockId) => getProgress(blockId, blocks),
    [blocks]
  );

  const getBlockChildren = useCallback(
    (blockId) => getChildren(blockId, blocks),
    [blocks]
  );

  const getBlock = useCallback(
    (blockId) => blocks.find((b) => b.id === blockId),
    [blocks]
  );

  return (
    <BlocksContext.Provider
      value={{
        blocks,
        rootBlocks,
        loading,
        totalCost,
        addBlock,
        updateBlock,
        deleteBlock,
        getAggregatedCost,
        getBlockProgress,
        getBlockChildren,
        getBlock,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocks = () => {
  const ctx = useContext(BlocksContext);
  if (!ctx) throw new Error("useBlocks must be used inside BlocksProvider");
  return ctx;
};
