import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import BlockForm from "./BlockForm";
import { useBlocks } from "../../contexts/BlocksContext";

const formatCost = (n) => {
  if (!n && n !== 0) return null;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const BlockRow = ({ block }) => {
  const navigate = useNavigate();
  const { getAggregatedCost, getBlockChildren, deleteBlock } = useBlocks();
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const aggCost = getAggregatedCost(block.id);
  const childCount = getBlockChildren(block.id).length;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${block.title}" and all its sub-blocks?`)) return;
    setDeleting(true);
    await deleteBlock(block.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditOpen(true);
  };

  return (
    <>
      <motion.div
        className="block-row"
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.18 }}
        onClick={() => navigate(`/block/${block.id}`)}
        style={{ opacity: deleting ? 0.5 : 1 }}
      >
        <div className="block-row-icon">
          {block.status === "completed" ? "✅" :
           block.status === "active" ? "⚡" :
           block.status === "planning" ? "🗺️" : "💡"}
        </div>

        <div className="block-row-body">
          <div className="block-row-title">{block.title || "Untitled"}</div>
          <div className="block-row-meta">
            <StatusBadge status={block.status} />
            {childCount > 0 && (
              <span className="block-row-meta-item">
                <span>📦</span>
                {childCount} sub-block{childCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <div className="block-row-right">
          {aggCost > 0 && (
            <span className="block-row-cost">{formatCost(aggCost)}</span>
          )}

          <div className="block-row-actions" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon" onClick={handleEdit} title="Edit" style={{ fontSize: "0.85rem" }}>
              ✏️
            </button>
            <button
              className="btn-icon"
              onClick={handleDelete}
              title="Delete"
              style={{ fontSize: "0.85rem", color: "var(--danger)" }}
            >
              🗑
            </button>
          </div>

          <span className="block-row-chevron">›</span>
        </div>
      </motion.div>

      <BlockForm
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        editBlock={block}
      />
    </>
  );
};

export default BlockRow;
