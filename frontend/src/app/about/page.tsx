import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      <nav className="bc-container" style={{ backgroundColor: "#000000" }}>
        <div className="mavii_wrap">
          <ol className="bc-list">
            <li className="bc-item">
              <Link href="/" className="bc-link">Home</Link>
            </li>
            <li className="bc-item">
              <span className="bc-current">About</span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="ci-section" style={{ backgroundColor: "#000000", paddingBlock: "80px", paddingBottom: "40px" }}>
        <div className="mavii_wrap">
          <div className="ci-title-wrapper" style={{ marginBottom: "30px" }}>
            <span className="ci-pill">Brand Talk | Market Walk</span>
          </div>
          <h1 className="ci-main-title" style={{ margin: 0, maxWidth: "1000px" }}>
            WE DON'T JUST DESIGN. WE ENGINEER DIGITAL DOMINANCE.
          </h1>
        </div>
      </section>

      <section className="section-pp" style={{ backgroundColor: "#000000", paddingBlock: "60px" }}>
        <div className="mavii_wrap">
          <div className="pp-section">
            <h2 style={{ color: "#ffffff" }}>The Manifesto</h2>
            <p style={{ color: "#a7a9ac", fontSize: "16px", lineHeight: "1.6", maxWidth: "800px" }}>
              Maviimedia wasn't built to be just another service provider. We step in as your true partners—treating your business with the exact same dedication as our own. When you hire us, you can finally breathe, knowing your vision is secured by strict timelines, absolute transparency, and a relentless pursuit of perfection.
            </p>
            <p style={{ color: "#a7a9ac", fontSize: "16px", lineHeight: "1.6", maxWidth: "800px" }}>
              Our work is deeply rooted in strategy, ensuring that every design decision serves a functional, calculated purpose in the broader market landscape. We do not just make things look good; we make them work flawlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="ci-section" style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.05)", paddingBlock: "80px" }}>
        <div className="mavii_wrap">
          <div className="wrk-header">
            <h2 className="wrk-label">Core Capabilities</h2>
          </div>
          <div className="ci-grid" style={{ marginTop: "50px" }}>
            <div className="ci-group">
              <span className="ci-label" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5151b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                01. Strategic Rebranding
              </span>
              <p className="ci-value" style={{ color: "#a7a9ac" }}>
                Transforming existing identities into market-leading brand presences. We elevate visual languages, messaging, and overall positioning to resonate deeply with premium audiences and outshine competitors.
              </p>
            </div>
            
            <div className="ci-group">
              <span className="ci-label" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5151b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                02. SaaS & Platform Building
              </span>
              <p className="ci-value" style={{ color: "#a7a9ac" }}>
                Developing robust, scalable digital platforms and software solutions. We focus on delivering seamless user experiences backed by powerful, modern technological stacks designed for longevity.
              </p>
            </div>

            <div className="ci-group">
              <span className="ci-label" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5151b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                03. Digital Architecture
              </span>
              <p className="ci-value" style={{ color: "#a7a9ac" }}>
                Structuring comprehensive online ecosystems. From high-conversion landing pages to complex corporate websites, we engineer digital environments that drive meaningful engagement and retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pp" style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.05)", paddingBlock: "80px" }}>
        <div className="mavii_wrap">
          <div className="pp-section">
            <h2 style={{ color: "#ffffff", marginBottom: "30px" }}>The Standard</h2>
            <ul className="pp-list" style={{ maxWidth: "100%", margin: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                <strong style={{ color: "#ffffff", fontFamily: "var(--ff-label)" }}>Execution:</strong> <span style={{ color: "#a7a9ac" }}>On-Time Delivery, Strict Project Timelines, Project Tracking.</span>
              </li>
              <li style={{ marginBottom: "15px" }}>
                <strong style={{ color: "#ffffff", fontFamily: "var(--ff-label)" }}>Integrity:</strong> <span style={{ color: "#a7a9ac" }}>Transparent Communication, Detailed Agreements, Data Confidentiality.</span>
              </li>
              <li style={{ marginBottom: "15px" }}>
                <strong style={{ color: "#ffffff", fontFamily: "var(--ff-label)" }}>Quality:</strong> <span style={{ color: "#a7a9ac" }}>Professional Documentation, Quality Revisions, 24/7 Client Support, Customized Solutions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ci-section" style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.05)", paddingBlock: "80px" }}>
        <div className="mavii_wrap">
          <div className="wrk-header">
            <h2 className="wrk-label">Services Index</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginTop: "50px" }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>01. SAAS Development</span>
            </div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>02. Chrome Extension Development</span>
            </div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>03. Website Development</span>
            </div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>04. UI Design & Branding</span>
            </div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>05. MVP Building</span>
            </div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" }}>
              <span className="ci-label" style={{ color: "#ffffff", letterSpacing: "0.05em", fontSize: "14px" }}>06. Mobile Application</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,255,255,0.05)", paddingBlock: "100px" }}>
        <div className="mavii_wrap">
          <h2 className="contact__title" style={{ marginBottom: "20px" }}>
            LET'S BUILD TOGETHER
          </h2>
          <p className="contact__subtitle" style={{ color: "#a7a9ac", maxWidth: "600px", fontSize: "15px", marginBottom: "60px" }}>
            We genuinely care about your business like it's our own, and we work with you like a partner.
            Your vision is in safe hands, and we'll bring it to life together.
          </p>

          <div className="contact__info">
            <div className="contact__block">
              <h3 className="contact__label">OFFICE</h3>
              <p className="contact__details" style={{ color: "#a7a9ac" }}>
                MAVIIMEDIA (MUMBAI OFFICE)
                <br />
                Goregaon (EAST), Mumbai
                <br />
                <a className="contact__link" href="mailto:contact@maviimedia.com">
                  contact@maviimedia.com
                </a>
              </p>
            </div>

            <div className="contact__block">
              <h3 className="contact__label">SUPPORT</h3>
              <p className="contact__details" style={{ color: "#a7a9ac" }}>
                <a className="contact__link" href="mailto:support@maviimedia.com">
                  support@maviimedia.com
                </a>
                <br />
                <a className="contact__link" href="tel:+919619431065">
                  +91 9619431065
                </a>
              </p>
            </div>

            <div className="contact__block">
              <h3 className="contact__label">PORTFOLIO</h3>
              <p className="contact__details" style={{ color: "#a7a9ac" }}>
                <Link className="contact__link" href="#">
                  Website & Software
                </Link>
                <br />
                <Link className="contact__link" href="#">
                  Video Editing
                </Link>
                <br />
                <a className="contact__link" href="mailto:hello@maviimedia.com">
                  hello@maviimedia.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}