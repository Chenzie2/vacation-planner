import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-white text-indigo-600"
        : "text-white hover:bg-indigo-500 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-white text-2xl md:text-3xl font-extrabold tracking-wide"
        >
          Dream Vacation Planner
        </NavLink>

        <div className="hidden md:flex space-x-4">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClasses}>Explore</NavLink>
          <NavLink to="/my-trip" className={navLinkClasses}>My Trip</NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 rounded-md hover:bg-indigo-500 transition"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-indigo-700`}>
        <div className="px-4 py-4 space-y-2">
          <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClasses} onClick={toggleMenu}>Explore</NavLink>
          <NavLink to="/my-trip" className={navLinkClasses} onClick={toggleMenu}>My Trip</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;