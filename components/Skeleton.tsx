export function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{
          height: 52, borderRadius: 12, overflow: "hidden", position: "relative",
          background: "var(--card)", border: "1px solid var(--border)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }} />
        </div>
      ))}
    </div>
  );
}