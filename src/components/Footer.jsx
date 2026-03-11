import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setSubmitStatus({ message: "Message received! We'll be in touch soon.", type: "success" });
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <footer style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', marginTop: 'auto', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>

        <div>
          <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.05em', textDecoration: 'none' }}>
            Travel <em style={{ color: 'var(--gold)' }}>Explorer</em>
          </Link>
          <p className="body-text" style={{ marginTop: '14px' }}>
            Plan your perfect getaway to destinations worldwide.
          </p>
        </div>

        <div>
          <h4 className="label-caps" style={{ marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/explore" className="nav-link">Explore</Link></li>
            <li><Link to="/my-trip" className="nav-link">My Trip</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="label-caps" style={{ marginBottom: '20px' }}>Contact Us</h4>
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="form-input"
              required
            />
            <textarea
              placeholder="Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              rows="3"
              className="form-input"
              style={{ resize: 'vertical' }}
              required
            />
            {submitStatus.message && (
              <div className={submitStatus.type === "success" ? "banner-success" : "banner-error"}>
                {submitStatus.message}
              </div>
            )}
            <button type="submit" className="btn-ghost">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', textAlign: 'center', padding: '24px' }}>
        <span className="label-caps" style={{ fontSize: '0.62rem', color: 'var(--text-faint)' }}>
          © {currentYear} Travel Explorer. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;