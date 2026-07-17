"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="mavii_wrap">
        <h2 id="contact-title" className="contact__title">
          CONTACT US
        </h2>
        <p className="contact__subtitle">
          We genuinely care about your business like it’s our own, and we work with you like a partner—not just a service provider.
          When you hire us, you can finally breathe—because your vision is in safe hands, and we’ll bring it to life together.
        </p>

        <div className="contact__info" aria-label="Contact directories">
          <div className="contact__block">
            <h3 className="contact__label">OFFICE</h3>
            <p className="contact__details">
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
            <p className="contact__details">
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
            <p className="contact__details">
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

        <div className="contact__faq" aria-labelledby="faq-title">
          <h3 id="faq-title" className="contact__faq-title">
            FREQUENTLY ASKED QUESTIONS
          </h3>

          <ul className="contact__faq-list">
            <li className="contact__faq-item">
              <button
                className="contact__faq-question"
                aria-expanded={openFaq === 1}
                aria-controls="faq-panel-1"
                id="faq-button-1"
                onClick={() => toggleFaq(1)}
              >
                How can I get in touch with Maviimedia for collaborations?
                <span className="contact__faq-icon" aria-hidden="true"></span>
              </button>
              <div
                id="faq-panel-1"
                className="contact__faq-answer"
                role="region"
                aria-labelledby="faq-button-1"
                hidden={openFaq !== 1}
              >
                <p>
                  For partnerships, send us your deck or brief at{" "}
                  <a className="contact__link" href="mailto:collab@maviimedia.com">
                    collab@maviimedia.com
                  </a>
                  . Our team usually responds within 3–5 business days. If it’s time-sensitive, please add <strong>[URGENT]</strong> in the subject line.
                </p>
              </div>
            </li>

            <li className="contact__faq-item">
              <button
                className="contact__faq-question"
                aria-expanded={openFaq === 2}
                aria-controls="faq-panel-2"
                id="faq-button-2"
                onClick={() => toggleFaq(2)}
              >
                Where can I find information on Maviimedia campaigns and releases?
                <span className="contact__faq-icon" aria-hidden="true"></span>
              </button>
              <div
                id="faq-panel-2"
                className="contact__faq-answer"
                role="region"
                aria-labelledby="faq-button-2"
                hidden={openFaq !== 2}
              >
                <p>
                  Our latest campaigns are published on our newsroom and Instagram. For press kits and hi-res assets, check the “Media Kit” section on the newsroom page.
                </p>
              </div>
            </li>

            <li className="contact__faq-item">
              <button
                className="contact__faq-question"
                aria-expanded={openFaq === 3}
                aria-controls="faq-panel-3"
                id="faq-button-3"
                onClick={() => toggleFaq(3)}
              >
                How can I reach your customer support team?
                <span className="contact__faq-icon" aria-hidden="true"></span>
              </button>
              <div
                id="faq-panel-3"
                className="contact__faq-answer"
                role="region"
                aria-labelledby="faq-button-3"
                hidden={openFaq !== 3}
              >
                <p>
                  To create support tickets, email us at{" "}
                  <a className="contact__link" href="mailto:support@maviimedia.com">
                    support@maviimedia.com
                  </a>
                  . Working hours: Mon–Fri, 10:00–18:00 IST. Average response time is 24–48 hours.
                </p>
              </div>
            </li>

            <li className="contact__faq-item">
              <button
                className="contact__faq-question"
                aria-expanded={openFaq === 4}
                aria-controls="faq-panel-4"
                id="faq-button-4"
                onClick={() => toggleFaq(4)}
              >
                How to purchase Maviimedia products/services?
                <span className="contact__faq-icon" aria-hidden="true"></span>
              </button>
              <div
                id="faq-panel-4"
                className="contact__faq-answer"
                role="region"
                aria-labelledby="faq-button-4"
                hidden={openFaq !== 4}
              >
                <p>
                  For business services, contact our sales team at{" "}
                  <a className="contact__link" href="mailto:sales@maviimedia.com">
                    sales@maviimedia.com
                  </a>
                  . A proposal and timeline will be shared according to your requirements.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}