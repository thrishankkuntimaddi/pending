import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StatusBadge, CategoryBadge } from "./StatusBadge";
import ProgressRing from "../ui/ProgressRing";
import BlockForm from "./BlockForm";
import { useBlocks } from "../../contexts/BlocksContext";

const formatCost = (n) => {
  if (!n && n !== 0) return null;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const BlockCard = ({ block }) => {
  const navigate = useNavigate();
  const { getAggregatedCost, getBlockProgress, deleteBlock } = useBlocks();
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const totalCost = getAggregatedCost(block.id);
  const progress = getBlockProgress(block.id);

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
        className="block-card"
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.22 }}
        whileHover={{ y: -3 }}
        onClick={() => navigate(`/block/${block.id}`)}
        style={{ opacity: deleting ? 0.5 : 1 }}
      >
        <div className="block-card-header">
          <h3 className="block-card-title">{block.title || "Untitled"}</h3>
          <div className="block-card-actions" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon" onClick={handleEdit} title="Edit">✏️</button>
            <button className="btn-icon" onClick={handleDelete} title="Delete" style={{ color: "var(--danger)" }}>🗑</button>
          </div>
        </div>

        {block.description && (
          <p className="block-card-desc">{block.description}</p>
        )}

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <StatusBadge status={block.status} />
          {block.category && block.category !== "General" && (
            <CategoryBadge category={block.category} />
          )}
        </div>

        <div className="block-card-footer">
          <div>
            {totalCost > 0 ? (
              <div className="block-card-cost">{formatCost(totalCost)}</div>
            ) : (
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>No cost yet</div>
            )}
          </div>
          <div className="block-card-meta">
            {progress ? (
              <ProgressRing
                completed={progress.completed}
                total={progress.total}
                size={40}
                strokeWidth={3}
              />
            ) : (
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  background: "var(--bg-active)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-full)",
                  padding: "3px 9px",
                }}
              >
                No sub-blocks
              </div>
            )}
          </div>
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

export default BlockCard;
