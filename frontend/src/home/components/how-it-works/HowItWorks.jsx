import './HowItWorks.scss';

const steps = [
  {
    number: '1',
    title: 'Upload Resume',
    description:
      'Upload your existing resume in PDF or DOCX format for our AI to analyze.',
    icon: 'upload',
  },
  {
    number: '2',
    title: 'Paste Job Description',
    description:
      'Paste the description of the role you\u2019re targeting to get a personalized match.',
    icon: 'document',
  },
  {
    number: '3',
    title: 'Get Match Score',
    description:
      'Receive a detailed score and AI suggestions to bridge the gap with the role requirements.',
    icon: 'chart',
  },
];

function StepIcon({ type }) {
  if (type === 'upload') {
    return (
      <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M12 18v-6M9 15l3-3 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'document') {
    return (
      <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M8 13h8M8 17h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 14l4-4 4 4 5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__header">
        <h2 className="how-it-works__title">How It Works</h2>
        <p className="how-it-works__subtitle">
          Three simple steps to optimize your resume and match with your dream jobs.
        </p>
      </div>
      <div className="how-it-works__grid">
        {steps.map((step) => (
          <article key={step.number} className={`step-card step-card--${step.icon}`}>
            <div className="step-card__icon-wrap">
              <StepIcon type={step.icon} />
            </div>
            <h3 className="step-card__title">
              {step.number}. {step.title}
            </h3>
            <p className="step-card__description">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
