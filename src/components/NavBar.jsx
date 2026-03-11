import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div className="flex items-center justify-between px-8" style={{ maxWidth: '1280px', margin: '0 auto', height: '72px' }}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            Travel <em style={{ color: 'var(--gold)' }}>Explorer</em>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Explore</NavLink>
          <NavLink to="/my-trip" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>My Trip</NavLink>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px' }}
          aria-label="Toggle Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {isMobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-8 pb-6 flex flex-col" style={{ background: 'rgba(10,10,15,0.98)', borderTop: '1px solid var(--border-subtle)' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>Home</NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>Explore</NavLink>
          <NavLink to="/my-trip" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '14px 0' }}>My Trip</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;