import { useState } from 'react';
import { Link } from 'react-router';
import './Navbar.scss';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <img className="navbar__logo" src="navbar-logo.png" alt="Resume Match Logo" />

        <button
          type="button"
          className="navbar__menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="navbar__menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`navbar__actions ${isMenuOpen ? 'navbar__actions--open' : ''}`}>
          <Link to="/sign-in" className="navbar__login">
            Login
          </Link>
          <Link to="/sign-up" className="navbar__cta">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
