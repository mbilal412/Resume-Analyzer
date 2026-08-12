import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { navbarUserButtonAppearance } from './navbarAppearance';
import './Navbar.scss';

function SignedInActions() {
  return (
    <div className="navbar__profile">
      <UserButton showName appearance={navbarUserButtonAppearance} />
      <svg
        className="navbar__chevron"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SignedOutActions() {
  return (
    <>
      <Link to="/sign-in" className="navbar__login">
        Login
      </Link>
      <Link to="/sign-up" className="navbar__cta">
        Get Started
      </Link>
    </>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const logoTarget = isLoaded && isSignedIn ? '/dashboard' : '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderActions = () => {
    if (!isLoaded) return null;
    return isSignedIn ? <SignedInActions /> : <SignedOutActions />;
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to={logoTarget} aria-label="Home">
          <img className="navbar__logo" src="/crackit-wordmark.svg" alt="CrackIt Logo" />
        </Link>

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
          {renderActions()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
