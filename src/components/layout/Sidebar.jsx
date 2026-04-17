import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBlocks } from "../../contexts/BlocksContext";

const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard", to: "/" },
  { icon: "✨", label: "Motivation", to: "/motivation" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { rootBlocks, totalCost } = useBlocks();
  const navigate = useNavigate();

  const formatCost = (n) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(1)}L`
      : n >= 1000
      ? `₹${(n / 1000).toFixed(1)}K`
      : `₹${n}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-text">Pending</div>
        <div className="sidebar-tagline">Your future, organised</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div className="divider" style={{ margin: "12px 0" }} />

        <div
          style={{
            padding: "12px 16px",
            background: "var(--bg-active)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Total Pending
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-accent)" }}>
            {formatCost(totalCost)}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
            across {rootBlocks.length} vision{rootBlocks.length !== 1 ? "s" : ""}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="sidebar-user-avatar"
              referrerPolicy="no-referrer"
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name">{user?.displayName || "User"}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
          <button
            className="btn-icon"
            onClick={logout}
            title="Sign out"
            style={{ flexShrink: 0 }}
          >
            ⏏
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
