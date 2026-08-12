import './VisualPreview.scss';

function VisualPreview() {
  return (
    <section className="visual-preview">
      <div className="visual-preview__container">
        <div className="visual-preview__bento">
          <div className="visual-preview__card visual-preview__card--score">
            <h3 className="visual-preview__card-title">Match Score</h3>
            <div className="visual-preview__score-ring">
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
          </div>
          
          <div className="visual-preview__card visual-preview__card--gaps">
            <h3 className="visual-preview__card-title">Skill Gaps</h3>
            <div className="visual-preview__gap-list">
              <div className="visual-preview__gap-item">
                <span className="visual-preview__gap-name">System Design</span>
                <span className="visual-preview__gap-badge visual-preview__gap-badge--high">High</span>
              </div>
              <div className="visual-preview__gap-item">
                <span className="visual-preview__gap-name">React Native</span>
                <span className="visual-preview__gap-badge visual-preview__gap-badge--medium">Medium</span>
              </div>
              <div className="visual-preview__gap-item">
                <span className="visual-preview__gap-name">GraphQL</span>
                <span className="visual-preview__gap-badge visual-preview__gap-badge--low">Low</span>
              </div>
            </div>
          </div>
          
          <div className="visual-preview__card visual-preview__card--question">
            <h3 className="visual-preview__card-title">Technical Question</h3>
            <div className="visual-preview__question-content">
              <p className="visual-preview__question-text">How do you handle state management in a large React application?</p>
              <div className="visual-preview__question-guidance">
                <span>Guidance: Discuss the tradeoffs between Context API and Redux. Mention your experience with both and when you would choose one over the other based on the job description requirements.</span>
              </div>
            </div>
          </div>
          
          <div className="visual-preview__card visual-preview__card--summary">
            <h3 className="visual-preview__card-title">Summary & Recommendation</h3>
            <div className="visual-preview__summary-content">
              <p className="visual-preview__summary-text">
                "Your background is strong in backend systems, but the role also expects hands-on cloud experience. You should focus on brushing up on AWS fundamentals before the interview."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualPreview;
