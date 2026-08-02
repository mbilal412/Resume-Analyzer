import './Hero.scss';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <span className="hero__badge">AI-POWERED OPTIMIZATION</span>
        <h1 className="hero__title">
          Optimize your resume <span className="hero__highlight">with AI</span>
        </h1>
        <p className="hero__subtitle">
          Get real-time AI feedback to align your resume with job descriptions and land your
          dream role. Optimize your career path with our expert analyzer.
        </p>
        <button type="button" className="hero__cta">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;
