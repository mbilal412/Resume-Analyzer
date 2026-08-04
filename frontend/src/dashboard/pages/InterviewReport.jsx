import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../../shared/components/navbar/Navbar';
import Footer from '../../shared/components/footer/Footer';
import '../../shared/components/ProtectedRoute.scss';
import './InterviewReport.scss';

const MOCK_REPORT = {
  jobTitle: 'Backend Engineer',
  date: 'Aug 15, 2026',
  matchScore: 40,
  jobDescription: `Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.
Design RESTful APIs, maintain scalable server architecture.`,
  skillGaps: {
    high: ['Node.js/Express.js', 'MongoDB', 'JWT Authentication', 'RESTful API Design'],
    medium: ['TypeScript', 'AWS', 'CI/CD Pipelines'],
    low: ['Redis/Caching'],
  },
  technicalQuestions: [
    {
      question: 'How would you implement JWT authentication in a Node.js/Express application?',
      answer:
        'Walk through the full auth flow: user login, token generation with a secret, storing tokens securely, middleware for protected routes, and refresh token strategy. Reference any JWT work from your resume.',
    },
    {
      question: 'Describe your approach to designing a MongoDB schema for a social feed.',
      answer:
        'Discuss embedding vs referencing, indexing for read-heavy queries, pagination strategies, and denormalization trade-offs. Tie it to projects where you modeled document data.',
    },
    {
      question: 'What are the trade-offs between Monolithic and Microservices architectures?',
      answer:
        'Compare deployment complexity, team autonomy, data consistency, and operational overhead. Give a balanced view and mention when each approach fits your experience level.',
    },
    {
      question: 'How do you use Docker in your development workflow?',
      answer:
        'Explain Dockerfile basics, docker-compose for local dev, containerizing Node apps, and how Docker improved consistency across environments in your past work.',
    },
  ],
  behavioralQuestions: [
    {
      question: 'Tell me about a time you had to debug a complex issue in production.',
      answer:
        'Use STAR: describe the incident, your systematic debugging approach (logs, monitoring, reproduction), the root cause, and the fix. Emphasize calm communication under pressure.',
    },
    {
      question:
        'Describe a situation where you had to collaborate closely with a frontend developer to finalize an API design.',
      answer:
        'Use STAR: explain the API requirements, how you agreed on request/response shapes, handled versioning or errors, and the outcome for the product.',
    },
  ],
};

function AccordionList({ items, sectionId, openIndex, onToggle }) {
  return (
    <div className="interview-report__accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${sectionId}-panel-${index}`;
        const triggerId = `${sectionId}-trigger-${index}`;

        return (
          <div
            key={item.question}
            className={`interview-report__accordion-item${isOpen ? ' interview-report__accordion-item--open' : ''}`}
          >
            <button
              type="button"
              id={triggerId}
              className="interview-report__accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="interview-report__accordion-panel"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function InterviewReport() {
  const { isSignedIn, isLoaded } = useAuth();
  const [openTechnical, setOpenTechnical] = useState(null);
  const [openBehavioral, setOpenBehavioral] = useState(null);

  const report = MOCK_REPORT;

  if (!isLoaded) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="interview-report">
      <Navbar />

      <main className="interview-report__main">
        <header className="interview-report__hero">
          <div className="interview-report__hero-text">
            <h1 className="interview-report__title">Interview Preparation Report</h1>
            <p className="interview-report__subtitle">
              {report.jobTitle} &bull; {report.date}
            </p>
          </div>

          <div className="interview-report__hero-actions">
            <div
              className="interview-report__score"
              aria-label={`Match score: ${report.matchScore}%`}
            >
              <span>{report.matchScore}%</span>
            </div>
            <button type="button" className="interview-report__download">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3v12M7 11l5 5 5-5M5 21h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </header>

        <section className="interview-report__card">
          <h2 className="interview-report__card-title">Submitted Details</h2>
          <div className="interview-report__details">
            <div className="interview-report__details-col">
              <span className="interview-report__details-label">Submitted Resume</span>
              <div className="interview-report__resume-box">
                <button type="button" className="interview-report__resume-btn">
                  View Uploaded Resume
                </button>
              </div>
            </div>
            <div className="interview-report__details-col">
              <span className="interview-report__details-label">Job Description</span>
              <div className="interview-report__job-desc">
                <p>{report.jobDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="interview-report__card">
          <h2 className="interview-report__card-title">Skill Gap Analysis</h2>
          <div className="interview-report__gaps">
            <div className="interview-report__gap-row">
              <span className="interview-report__priority interview-report__priority--high">
                High Priority
              </span>
              <div className="interview-report__skills">
                {report.skillGaps.high.map((skill) => (
                  <span
                    key={skill}
                    className="interview-report__skill interview-report__skill--high"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="interview-report__gap-row">
              <span className="interview-report__priority interview-report__priority--medium">
                Medium Priority
              </span>
              <div className="interview-report__skills">
                {report.skillGaps.medium.map((skill) => (
                  <span
                    key={skill}
                    className="interview-report__skill interview-report__skill--medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="interview-report__gap-row">
              <span className="interview-report__priority interview-report__priority--low">
                Low Priority
              </span>
              <div className="interview-report__skills">
                {report.skillGaps.low.map((skill) => (
                  <span
                    key={skill}
                    className="interview-report__skill interview-report__skill--low"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="interview-report__card">
          <h2 className="interview-report__card-title">Technical Interview Questions</h2>
          <AccordionList
            items={report.technicalQuestions}
            sectionId="technical"
            openIndex={openTechnical}
            onToggle={setOpenTechnical}
          />
        </section>

        <section className="interview-report__card">
          <h2 className="interview-report__card-title">Behavioral Questions (STAR Method)</h2>
          <AccordionList
            items={report.behavioralQuestions}
            sectionId="behavioral"
            openIndex={openBehavioral}
            onToggle={setOpenBehavioral}
          />
        </section>

        <div className="interview-report__back-wrap">
          <Link to="/dashboard" className="interview-report__back">
            Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default InterviewReport;
