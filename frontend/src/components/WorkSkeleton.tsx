export default function WorkSkeleton() {
  return (
    <div className="wrk-grid skeleton-container">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="wrk-item skeleton-pulse">
          <div className="wrk-visual skeleton-bg"></div>
        </div>
      ))}
    </div>
  );
}