import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlocks } from "../contexts/BlocksContext";
import { useAuth } from "../contexts/AuthContext";
import BlockCard from "../components/blocks/BlockCard";
import BlockForm from "../components/blocks/BlockForm";
import Loader from "../components/ui/Loader";

const formatCost = (n) => {
  if (!n) return "₹0";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const Dashboard = () => {
  const { user } = useAuth();
  const { rootBlocks, blocks, totalCost, loading } = useBlocks();
  const [addOpen, setAddOpen] = useState(false);

  const completedCount = blocks.filter((b) => b.status === "completed").length;
  const activeCount = blocks.filter((b) => b.status === "active").length;

  const firstName = user?.displayName?.split(" ")[0] || "there";

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4, fontWeight: 500 }}>
            Hello, {firstName} 👋
          </div>
          <h1 className="page-title">Your Vision Board</h1>
          <p className="page-subtitle">All the things you're building towards</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setAddOpen(true)}
          id="add-block-btn"
        >
          ✦ New Vision
        </button>
      </div>

      {/* Stats Strip */}
      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-card-icon">🧱</div>
          <div className="stat-card-value">{rootBlocks.length}</div>
          <div className="stat-card-label">Visions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📦</div>
          <div className="stat-card-value">{blocks.length}</div>
          <div className="stat-card-label">Total Blocks</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⚡</div>
          <div className="stat-card-value">{activeCount}</div>
          <div className="stat-card-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">💰</div>
          <div className="stat-card-value" style={{ color: "var(--text-accent)" }}>
            {formatCost(totalCost)}
          </div>
          <div className="stat-card-label">Total Pending Value</div>
        </div>
      </div>

      {/* Blocks Grid */}
      {rootBlocks.length === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="empty-state-icon">🌱</div>
          <h2 className="empty-state-title">Your vision awaits</h2>
          <p className="empty-state-desc">
            Start by creating your first vision block. Break down your dreams,
            desires, and goals — no deadlines, no pressure.
          </p>
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            ✦ Create First Block
          </button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="blocks-grid">
            {rootBlocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Desktop FAB — shown for quick access */}
      {rootBlocks.length > 0 && (
        <button
          className="fab"
          onClick={() => setAddOpen(true)}
          style={{ bottom: 24 }}
          aria-label="Add new vision block"
          id="dashboard-fab"
        >
          ＋
        </button>
      )}

      {/* Add Block Modal */}
      <BlockForm
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        parentId={null}
      />
    </div>
  );
};

export default Dashboard;
