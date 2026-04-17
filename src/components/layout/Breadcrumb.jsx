import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ ancestors, current }) => {
  const navigate = useNavigate();

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <button
        className="breadcrumb-item"
        onClick={() => navigate("/")}
      >
        🏠 Home
      </button>

      {ancestors.map((block) => (
        <span key={block.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="breadcrumb-sep">›</span>
          <button
            className="breadcrumb-item"
            onClick={() => navigate(`/block/${block.id}`)}
          >
            {block.title || "Untitled"}
          </button>
        </span>
      ))}

      {current && (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-item current">
            {current.title || "Untitled"}
          </span>
        </span>
      )}
    </nav>
  );
};

export default Breadcrumb;
