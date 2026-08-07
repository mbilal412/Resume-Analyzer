import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../../shared/components/navbar/Navbar';
import Footer from '../../shared/components/footer/Footer';
import '../../shared/components/ProtectedRoute.scss';
import './InterviewReport.scss';





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
