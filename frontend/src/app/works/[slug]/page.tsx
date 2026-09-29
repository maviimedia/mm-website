import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: workList } = await supabase
    .from("works")
    .select("title, brief, banner_url")
    .eq("slug", slug);

  const work = workList?.[0];

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: work.title,
    description: work.brief || `${work.title} case study by MAVIIMEDIA`,
    openGraph: {
      title: work.title,
      description: work.brief || `${work.title} case study by MAVIIMEDIA`,
      images: work.banner_url
        ? [
            {
              url: work.banner_url,
              width: 1200,
              height: 630,
              alt: work.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.brief || `${work.title} case study by MAVIIMEDIA`,
      images: work.banner_url ? [work.banner_url] : [],
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
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
              <Link href="/" className="bc-link">work</Link>
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
              <Image 
                src={work.banner_url} 
                alt={`${work.title} Banner`} 
                width={1440}
                height={800}
                priority
                sizes="(max-width: 1064px) 100vw, 1064px"
                className="cb-image"
                style={{ width: "100%", height: "auto" }}
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
                    <Image 
                      src={media.image_url} 
                      alt={media.title ? media.title.replace(/\.[^/.]+$/, "") : "Project Media"} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
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