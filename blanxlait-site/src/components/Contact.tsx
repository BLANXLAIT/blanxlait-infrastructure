import React from 'react';

const CAL_LINK = 'https://cal.com/ryan-niemes-wwremh/30min';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section section-bg">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Ready to Transform Your Business with
            <span className="hero-highlight">
              {" "}AI?
            </span>
          </h2>
          <p className="section-subtitle">
            Let's discuss how BLANXLAIT can help your business leverage AI-native solutions
            to stay ahead of the competition.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-cta">
            <h3 className="contact-title">Book a Free Consultation</h3>
            <p className="contact-description">
              Schedule a 30-minute call to discuss your AI needs and explore how we can help
              transform your business operations.
            </p>

            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              Schedule a Call
            </a>

            <p className="contact-alt">
              or email us at{' '}
              <a href="mailto:hello@blanxlait.com" className="contact-email">
                hello@blanxlait.com
              </a>
            </p>
          </div>

          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon">30</div>
              <h4 className="contact-info-title">Minutes</h4>
              <p className="contact-info-text">Free strategy session to understand your needs</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">24h</div>
              <h4 className="contact-info-title">Response Time</h4>
              <p className="contact-info-text">We respond to all inquiries within one business day</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">AI</div>
              <h4 className="contact-info-title">Expert Guidance</h4>
              <p className="contact-info-text">Get actionable insights for your AI journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
