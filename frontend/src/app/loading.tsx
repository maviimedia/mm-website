export default function Loading() {
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#000000", zIndex: 9999 }}>
      <img
        className="spin"
        src="/assets/Logo-ICON.svg"
        alt="Loading..."
        width="50"
        height="50"
      />
    </div>
  );
}