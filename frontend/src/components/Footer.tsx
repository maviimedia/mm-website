import Link from "next/link";

export default function Footer() {
  return (
    <section id="footer" className="footer-pp" role="contentinfo" aria-label="Site Footer">
      <div className="mavii_wrap">
        <div className="footer-pp__top-card">
          <div className="footer-pp__info">
            <div className="footer-pp__block footer-pp__block--year">
              <div className="footer-pp__label">
                <span>Year Founded</span>
              </div>
              <div className="footer-pp__value footer-pp__year">2021</div>
            </div>
            <div className="footer-pp__block footer-pp__block--location">
              <div className="footer-pp__label">
                <span>Location</span>
              </div>
              <div className="footer-pp__value footer-pp__location">Mumbai, India</div>
            </div>
          </div>
        </div>

        <div className="footer-pp__grid">
          <div className="footer-pp__col">
            <h4 className="footer-pp__heading">Get in touch</h4>
            <a className="footer-pp__link" href="mailto:business@maviimedia.com">
              business@maviimedia.com
            </a>
            <a className="footer-pp__link" href="mailto:hello@maviimedia.com">
              hello@maviimedia.com
            </a>
          </div>
          <div className="footer-pp__col">
            <h4 className="footer-pp__heading">Connect</h4>
            <Link className="footer-pp__link" href="#">
              Facebook
            </Link>
            <Link className="footer-pp__link" href="#">
              Instagram
            </Link>
          </div>
          <div className="footer-pp__col">
            <h4 className="footer-pp__heading">Location</h4>
            <p className="footer-pp__text">
              Mantri Park
              <br />
              Goregaon East
              <br />
              Mumbai 400065
            </p>
          </div>
          <div className="footer-pp__col">
            <h4 className="footer-pp__heading">Ventures</h4>
            <p className="footer-pp__text">
              Mumbai
              <br />
              Pune
              <br />
              New Delhi
            </p>
          </div>
        </div>

        <div className="footer-pp__legal">
          <span className="footer-pp__small">Maviimedia</span>
          <span className="footer-pp__dot" aria-hidden="true">
            •
          </span>
          <span className="footer-pp__small">© 2026</span>
          <span className="footer-pp__dot" aria-hidden="true">
            •
          </span>
          <Link className="footer-pp__small footer-pp__link--muted" href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </section>
  );
}