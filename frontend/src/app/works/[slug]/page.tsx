import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const { data: workList } = await supabase.from("works").select("*").eq("slug", slug);
  const work = workList?.[0];
  
  if (!work) {
    notFound();
  }

  const { data: gallery } = await supabase.from("work_media").select("*").eq("work_id", work.id);

  return (
    <main>
      <nav id="breadcrumb" className="bc-container">
        <div className="mavii_wrap">
          <ol className="bc-list">
            <li className="bc-item">
              <a href="/" className="bc-link">work</a>
            </li>
            <li className="bc-item">
              <span className="bc-current">{work.title.toLowerCase()}</span>
            </li>
          </ol>
        </div>
      </nav>

      <section id="client-info" className="ci-section">
        <div className="mavii_wrap">
          <header className="ci-header">
            <div className="ci-title-wrapper">
              <h2 className="ci-main-title">{work.title}</h2>
              <span className="ci-pill">{work.pill}</span>
            </div>
          </header>

          <div className="ci-grid">
            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">Client</span>
                <p className="ci-value">{work.client_name}</p>
              </div>
              <div className="ci-group">
                <span className="ci-label">Type of Client</span>
                <p className="ci-value">{work.client_type}</p>
              </div>
              <div className="ci-group">
                <span className="ci-label">Services</span>
                <p className="ci-value">{work.services}</p>
              </div>
            </div>

            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">Brief</span>
                <p className="ci-value">{work.brief}</p>
              </div>
              <div className="ci-group">
                <span className="ci-label">The Big Idea</span>
                <p className="ci-value">{work.big_idea}</p>
              </div>
            </div>

            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">Result</span>
                <p className="ci-value">{work.result}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {work.banner_url && (
        <section id="client-banner" className="cb-section">
          <div className="mavii_wrap">
            <div className="cb-banner">
              <img 
                src={work.banner_url} 
                alt={`${work.title} Banner`} 
                className="cb-image"
                loading="lazy"
              />
              <div className="cb-overlay"></div>
            </div>
          </div>
        </section>
      )}

      {gallery && gallery.length > 0 && (
        <section id="work" className="work-section">
          <div className="mavii_wrap">
            <div className="wrk-header">
              <h2 className="wrk-label">PROJECT MEDIA</h2>
            </div>

            <div className="wrk-grid">
              {gallery.map((media: any) => (
                <div key={media.id} className="wrk-item">
                  <div className="wrk-visual">
                    <img 
                      src={media.image_url} 
                      alt={media.title ? media.title.replace(/\.[^/.]+$/, "") : "Project Media"} 
                      loading="lazy" 
                    />
                    <div className="wrk-overlay">
                      <span className="wrk-title">
                        {media.title ? media.title.replace(/\.[^/.]+$/, "") : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}