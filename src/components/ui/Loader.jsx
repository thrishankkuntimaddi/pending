const Loader = ({ fullscreen = true }) => {
  if (fullscreen) {
    return (
      <div className="loader-overlay">
        <div style={{ textAlign: "center" }}>
          <div className="loader-spinner" />
          <p style={{ marginTop: 16, color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Loading…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div className="loader-spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
    </div>
  );
};

export default Loader;
