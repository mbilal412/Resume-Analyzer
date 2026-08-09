import { Link } from 'react-router';
import './Hero.scss';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <span className="hero__badge">AI-POWERED OPTIMIZATION</span>
        <h1 className="hero__title">
          Know exactly where you stand before you apply <span className="hero__highlight"></span>
        </h1>
        <p className="hero__subtitle">
          Get real-time AI feedback to align your resume with job descriptions and land your
          dream role. Optimize your career path with our expert analyzer.
        </p>
        <Link to="/sing-up" type="button" className="hero__cta">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Hero;
