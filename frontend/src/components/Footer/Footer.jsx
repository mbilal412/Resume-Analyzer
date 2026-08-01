import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">resume match</span>
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
