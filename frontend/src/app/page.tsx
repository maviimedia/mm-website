import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: allWorks } = await supabase.from("works").select("*");

  return (
    <section id="media" className="media">
      <div className="mavii_wrap">
        <div className="media__frame" aria-label="Media gallery">
          {allWorks?.map((work: any) => (
            <figure key={work.id} className="media__item">
              <Link
                className="media__link"
                href={`/works/${work.slug}`}
                aria-label={`Open ${work.title} detail`}
              >
                <img
                  src={work.thumbnail_url || work.banner_url}
                  alt={`${work.title} branding preview`}
                  width={1280}
                  height={720}
                  decoding="async"
                />
                <span className="media__overlay" aria-hidden="true">
                  <span className="media__overlay-text">{work.title}</span>
                </span>
              </Link>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}