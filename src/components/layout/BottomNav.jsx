import { NavLink } from "react-router-dom";

const BottomNav = ({ onAddClick }) => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <span className="nav-icon">🏠</span>
        <span>Home</span>
      </NavLink>

      <button className="bottom-nav-add" onClick={onAddClick} aria-label="Add Block">
        ＋
      </button>

      <NavLink
        to="/motivation"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <span className="nav-icon">✨</span>
        <span>Inspire</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
