export const dynamic = "force-dynamic";

import { fetchWorksPagination } from "../../lib/workActions";
import InfiniteWorkList from "../../components/InfiniteWorkList";

export default async function WorksPage() {
  const { data: initialWorks, error } = await fetchWorksPagination(1, 8);

  return (
    <main>
      <section id="work" className="work-section">
        <div className="mavii_wrap">
          <div className="wrk-header">
            <h1 className="wrk-label">ALL WORKS</h1>
          </div>

          {error ? (
            <div className="error-wrapper">Failed to load works: {error}</div>
          ) : (
            <InfiniteWorkList initialWorks={initialWorks} />
          )}
        </div>
      </section>
    </main>
  );
}