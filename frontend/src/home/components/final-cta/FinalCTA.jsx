import { Link } from 'react-router';
import './FinalCTA.scss';

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__container">
        <h2 className="final-cta__title">Ready to see where you stand?</h2>
        <p className="final-cta__subtitle">
          Upload your resume and get a realistic assessment of your job readiness today.
        </p>
        <Link to="/sign-up" className="final-cta__button">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default FinalCTA;
