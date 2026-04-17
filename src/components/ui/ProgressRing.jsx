const ProgressRing = ({ completed = 0, total = 0, size = 44, strokeWidth = 3 }) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? completed / total : 0;
  const strokeDashoffset = circumference * (1 - progress);
  const pct = Math.round(progress * 100);

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress — stark white */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <span className="progress-ring-text">{pct}%</span>
    </div>
  );
};

export default ProgressRing;
