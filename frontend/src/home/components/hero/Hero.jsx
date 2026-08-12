import { Link } from 'react-router';
import './Hero.scss';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
      </div>
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-icon">✨</span>
            <span className="hero__badge-text">AI-Powered Readiness Analysis</span>
          </div>
          <h1 className="hero__title">
            Know exactly where you stand before you apply
          </h1>
          <p className="hero__subtitle">
            Upload your resume and a job description to get your match score, skill gaps, and interview questions tailored to the role — complete with guidance on how to answer them.
          </p>
          <div className="hero__cta-wrapper">
            <Link to="/sign-up" className="hero__cta">
              Get Started
            </Link>
            <div className="hero__trust">
              <span>🔒 Your data stays private</span>
              <span className="hero__trust-dot">•</span>
              <span>⚡ Results in seconds</span>
              <span className="hero__trust-dot">•</span>
              <span>🎯 Tailored to each job</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__card-wrapper">
            <div className="hero__card-glow"></div>
            <div className="hero__card">
              <div className="hero__card-score">
                <div className="hero__score-ring">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray="78, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">78%</text>
                  </svg>
                </div>
                <span className="hero__score-label">Match Score</span>
              </div>
              <div className="hero__card-gaps">
                <h3 className="hero__gaps-title">Skill Gaps</h3>
                <div className="hero__gap-item">
                  <span className="hero__gap-name">Cloud Architecture</span>
                  <span className="hero__gap-badge hero__gap-badge--high">High</span>
                </div>
                <div className="hero__gap-item">
                  <span className="hero__gap-name">API Design</span>
                  <span className="hero__gap-badge hero__gap-badge--low">Low</span>
                </div>
              </div>
              <div className="hero__card-question">
                <h3 className="hero__question-title">Technical Question</h3>
                <p className="hero__question-text">How would you design a scalable microservices architecture?</p>
                <div className="hero__question-guidance">
                  <span>Guidance: Start by discussing load balancers and...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
