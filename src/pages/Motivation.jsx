import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBlocks } from "../contexts/BlocksContext";

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "A dream doesn't become reality through magic; it takes sweat, determination and hard work.", author: "Colin Powell" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
];

const formatCost = (n) => {
  if (!n) return "₹0";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Crore`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} Lakh`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const Motivation = () => {
  const { blocks, rootBlocks, totalCost, loading } = useBlocks();
  const navigate = useNavigate();

  const [quoteIndex, setQuoteIndex] = useState(
    () => Math.floor(Math.random() * QUOTES.length)
  );
  const [highlightIndex, setHighlightIndex] = useState(
    () => Math.floor(Math.random() * Math.max(rootBlocks.length, 1))
  );

  const quote = QUOTES[quoteIndex];
  const highlight = rootBlocks[highlightIndex % Math.max(rootBlocks.length, 1)];

  const cycleQuote = () => {
    setQuoteIndex((i) => (i + 1) % QUOTES.length);
  };

  const cycleHighlight = () => {
    setHighlightIndex((i) => (i + 1) % Math.max(rootBlocks.length, 1));
  };

  const completedCount = blocks.filter((b) => b.status === "completed").length;
  const totalCount = blocks.length;

  return (
    <div className="motivation-page">
      {/* Animated Background */}
      <div className="motivation-bg">
        <div className="motivation-orb motivation-orb-1" />
        <div className="motivation-orb motivation-orb-2" />
        <div className="motivation-orb motivation-orb-3" />
      </div>

      <div className="motivation-content">
        {/* Tagline */}
        <motion.p
          className="motivation-tagline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          This is what you're working for
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="motivation-headline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Your Pending<br />Dreams
        </motion.h1>

        {/* Total Cost */}
        <motion.div
          className="motivation-total"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {formatCost(totalCost)}
        </motion.div>
        <motion.p
          className="motivation-total-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          worth of visions — {rootBlocks.length} goals with {totalCount} blocks · {completedCount} completed
        </motion.p>

        {/* Highlighted Block */}
        {highlight && (
          <motion.div
            className="motivation-highlight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div className="motivation-highlight-label">✨ Your Next Vision</div>
              <button
                className="btn btn-ghost"
                onClick={cycleHighlight}
                style={{ fontSize: "0.75rem", padding: "4px 10px" }}
              >
                Shuffle ↻
              </button>
            </div>
            <div
              className="motivation-highlight-title"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/block/${highlight.id}`)}
            >
              {highlight.title}
            </div>
            {highlight.description && (
              <p className="motivation-highlight-desc">{highlight.description}</p>
            )}
            {highlight.cost && (
              <div style={{ marginTop: 12, fontSize: "0.9rem", fontWeight: 700, color: "var(--text-accent)" }}>
                Estimated: {formatCost(highlight.cost)}
              </div>
            )}
          </motion.div>
        )}

        {/* No blocks state */}
        {rootBlocks.length === 0 && !loading && (
          <motion.div
            className="motivation-highlight-card"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🌱</div>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              You haven't added any visions yet. Start building your future!
            </p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
              Add Your First Vision
            </button>
          </motion.div>
        )}

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            className="motivation-quote"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35 }}
          >
            "{quote.text}"
            <div className="motivation-quote-author">— {quote.author}</div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="btn btn-ghost"
          onClick={cycleQuote}
          style={{ marginTop: 16, alignSelf: "center" }}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Next Quote ↻
        </motion.button>
      </div>
    </div>
  );
};

export default Motivation;
