import './HowItWorks.scss';

const steps = [
  {
    number: '1',
    title: 'Upload',
    description: 'Upload your resume and paste the job description you\'re targeting',
    icon: 'upload',
  },
  {
    number: '2',
    title: 'Analyze',
    description: 'Our AI compares your background against the role\'s actual requirements',
    icon: 'analyze',
  },
  {
    number: '3',
    title: 'Prepare',
    description: 'Get your match score, skill gaps, interview questions with answer guidance, and a clear summary with next steps',
    icon: 'prepare',
  },
];

function StepIcon({ type }) {
  if (type === 'upload') {
    return (
      <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'analyze') {
    return (
      <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="step-card__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <div className="how-it-works__header">
          <h2 className="how-it-works__title">How It Works</h2>
        </div>
        <div className="how-it-works__grid">
          {steps.map((step) => (
            <article key={step.number} className="step-card">
              <div className="step-card__icon-wrap">
                <StepIcon type={step.icon} />
              </div>
              <h3 className="step-card__title">
                Step {step.number}: {step.title}
              </h3>
              <p className="step-card__description">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
