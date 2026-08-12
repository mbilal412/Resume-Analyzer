import './Footer.scss';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

function Footer() {
  const { isSignedIn, isLoaded } = useAuth();
  const logoTarget = isLoaded && isSignedIn ? '/dashboard' : '/';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to={logoTarget} className="footer__logo" aria-label="Home">
            CrackIt
          </Link>
          <span className="footer__copyright">
            &copy; {currentYear} CrackIt. All rights reserved.
          </span>
        </div>
        <div className="footer__links">
          <Link to="/privacy" className="footer__link">Privacy Policy</Link>
          <Link to="/terms" className="footer__link">Terms of Service</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
