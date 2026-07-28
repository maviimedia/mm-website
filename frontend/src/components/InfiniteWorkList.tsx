"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchWorksPagination } from "../lib/workActions";
import WorkSkeleton from "./WorkSkeleton";

export default function InfiniteWorkList({ initialWorks }: { initialWorks: any[] }) {
  const [works, setWorks] = useState(initialWorks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (page === 1) return;

    const loadMoreWorks = async () => {
      setLoading(true);
      setError(null);

      const result = await fetchWorksPagination(page, 8);

      if (result.error) {
        setError(result.error);
      } else {
        setWorks((prevWorks) => {
          const newWorks = result.data.filter(
            (newWork: any) => !prevWorks.some((prevWork: any) => prevWork.id === newWork.id)
          );
          return [...prevWorks, ...newWorks];
        });
        setHasMore(result.hasMore);
      }

      setLoading(false);
    };

    loadMoreWorks();
  }, [page]);

  return (
    <>
      {error && (
        <div className="error-wrapper">
          <p>{error}</p>
        </div>
      )}

      <div className="wrk-grid">
        {works.map((work, index) => {
          const isLast = works.length === index + 1;
          return (
            <div key={work.id} ref={isLast ? lastElementRef : null} className="wrk-item">
              <Link href={`/works/${work.slug}`}>
                <div className="wrk-visual">
                  <img 
                    src={work.banner_url} 
                    alt={work.title} 
                    loading="lazy" 
                  />
                  <div className="wrk-overlay">
                    <span className="wrk-title">{work.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {loading && <WorkSkeleton />}
    </>
  );
}