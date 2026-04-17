const STATUS_CONFIG = {
  idea: { label: "Idea", icon: "💡" },
  planning: { label: "Planning", icon: "🗺️" },
  active: { label: "Active", icon: "⚡" },
  completed: { label: "Completed", icon: "✅" },
};

const CATEGORY_COLORS = {
  Financial: "var(--cat-financial)",
  Lifestyle: "var(--cat-lifestyle)",
  Setup: "var(--cat-setup)",
  Learning: "var(--cat-learning)",
  Health: "var(--cat-health)",
  Family: "var(--cat-family)",
  General: "var(--cat-general)",
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.idea;
  return (
    <span className={`status-badge ${status}`}>
      <span className="status-dot" />
      {config.label}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  const color = CATEGORY_COLORS[category] || "var(--cat-general)";
  return (
    <span
      className="category-badge"
      style={{ color, borderColor: `${color}30` }}
    >
      {category || "General"}
    </span>
  );
};

export const CATEGORIES = [
  "General",
  "Financial",
  "Lifestyle",
  "Setup",
  "Learning",
  "Health",
  "Family",
];

export const STATUSES = ["idea", "planning", "active", "completed"];
