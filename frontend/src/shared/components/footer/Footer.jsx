import './Footer.scss';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

function Footer() {
  const { isSignedIn, isLoaded } = useAuth();
  const logoTarget = isLoaded && isSignedIn ? '/dashboard' : '/';

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to={logoTarget} className="footer__logo" aria-label="Home">
            resume match
          </Link>
          <span className="footer__copyright">
            &copy; 2026 Resume Match AI. All rights reserved.
          </span>
        </div>
        <div className="footer__links">
          <span className="footer__link">Privacy Policy</span>
          <span className="footer__link">Terms of Service</span>
          <span className="footer__link">Contact Support</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
