import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <nav id="breadcrumb" className="bc-container">
        <div className="mavii_wrap">
          <ol className="bc-list">
            <li className="bc-item">
              <Link href="/" className="bc-link">home</Link>
            </li>
            <li className="bc-item">
              <span className="bc-current">about</span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="ci-section" style={{ paddingBlock: "80px", paddingBottom: "40px" }}>
        <div className="mavii_wrap">
          <h1 className="ci-main-title" style={{ margin: 0, maxWidth: "900px" }}>
            We are Maviimedia. Architects of Digital Experiences.
          </h1>
        </div>
      </section>

      <section className="section-pp">
        <div className="mavii_wrap">
          <div className="pp-section">
            <h2>The Manifesto</h2>
            <p>
              Established in 2021, Maviimedia began with a singular vision: to bridge the gap between striking aesthetics and robust market performance. We refuse to believe that a premium brand identity cannot drive measurable growth. Every digital touchpoint is an opportunity to assert authority. We build digital architectures that command attention and scale businesses to their absolute highest potential.
            </p>
            <p>
              Our work is deeply rooted in strategy, ensuring that every design decision serves a functional, calculated purpose in the broader market landscape. We do not just make things look good; we make them work flawlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="ci-section" style={{ backgroundColor: "#0b0b0b", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBlock: "80px" }}>
        <div className="mavii_wrap">
          <div className="wrk-header">
            <h2 className="wrk-label">Core Capabilities</h2>
          </div>
          <div className="ci-grid" style={{ marginTop: "50px" }}>
            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">01. Strategic Rebranding</span>
                <p className="ci-value">
                  Transforming existing identities into market-leading brand presences. We elevate visual languages, messaging, and overall positioning to resonate deeply with premium audiences and outshine competitors.
                </p>
              </div>
            </div>
            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">02. SaaS & Platform Building</span>
                <p className="ci-value">
                  Developing robust, scalable digital platforms and software solutions. We focus on delivering seamless user experiences backed by powerful, modern technological stacks designed for longevity.
                </p>
              </div>
            </div>
            <div className="ci-col">
              <div className="ci-group">
                <span className="ci-label">03. Digital Architecture</span>
                <p className="ci-value">
                  Structuring comprehensive online ecosystems. From high-conversion landing pages to complex corporate websites, we engineer digital environments that drive meaningful engagement and retention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" style={{ textAlign: "center", paddingBlock: "120px" }}>
        <div className="mavii_wrap">
          <h2 className="contact__title" style={{ margin: "0 0 20px 0" }}>Brand Talk | Market Walk</h2>
          <p className="contact__subtitle" style={{ margin: "0 auto", maxWidth: "600px", fontSize: "16px", lineHeight: "1.6" }}>
            Our philosophy is remarkably simple. We do not design merely for the sake of design. We build strategic assets that perform, scale, and dominate their respective markets.
          </p>
        </div>
      </section>

      <section className="section-pp">
        <div className="mavii_wrap">
          <div className="pp-section">
            <h2>Our Approach</h2>
            <ul className="pp-list">
              <li>
                <strong style={{ color: "#ffffff" }}>Discovery & Strategy:</strong> Deep-dive into your brand objectives, market landscape, and technical requirements before a single line of code or pixel is drawn.
              </li>
              <li>
                <strong style={{ color: "#ffffff" }}>Design & Prototyping:</strong> Crafting bespoke visual languages and intuitive user journeys that align perfectly with the established strategy.
              </li>
              <li>
                <strong style={{ color: "#ffffff" }}>Engineering & Deployment:</strong> Building robust solutions utilizing modern technology stacks, ensuring both unmatched scale and strict security.
              </li>
              <li>
                <strong style={{ color: "#ffffff" }}>Market Alignment:</strong> Continuous refinement and rigorous testing to ensure the final product exceeds market demands and user expectations.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ci-section" style={{ paddingBottom: "100px" }}>
        <div className="mavii_wrap">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "60px" }}>
            <h2 className="ci-main-title" style={{ margin: 0, fontSize: "clamp(24px, 4vw, 48px)" }}>Ready to scale your vision?</h2>
            <Link href="/contact" className="ci-pill" style={{ textDecoration: "none", fontSize: "12px", padding: "10px 24px" }}>
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}