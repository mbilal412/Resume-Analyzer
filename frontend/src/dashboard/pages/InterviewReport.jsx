import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../../shared/components/navbar/Navbar";
import Footer from "../../shared/components/footer/Footer";
import "../../shared/components/ProtectedRoute.scss";
import "./InterviewReport.scss";
import { useAnalysis } from "../hooks/useAnalysis";

const PRIORITY_ORDER = ["high", "medium", "low"];
const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function normalizeReport(raw = {}) {
  const skillGaps = (raw.skillGaps ?? raw.skillsGap ?? []).map((item) => ({
    skill: item.skill ?? item.skills ?? "",
    importance: item.importance ?? item.intensity ?? "medium",
  }));

  return {
    jobTitle: raw.jobTitle ?? "Role not specified",
    matchScore: raw.matchScore ?? raw.scoreMatch ?? 0,
    technicalQuestions: raw.technicalQuestions ?? raw.technicalquestion ?? [],
    skillGaps: skillGaps.filter((item) => item.skill),
    summary: raw.summary ?? "",
    recommendation: raw.recommendation ?? "",
    resume: raw.resume ?? raw.uploadedResume ?? "",
    jobDescription: raw.jobDescription ?? raw.uploadedJobDescription ?? "",
    createdAt: raw.createdAt ?? null,
  };
}

function getScoreLevel(score) {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  return "low";
}

function formatReportDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function QuestionList({ items, openIndex, onToggle }) {
  if (!items.length) {
    return (
      <p className="interview-report__empty">
        No technical questions available.
      </p>
    );
  }

  return (
    <ol className="interview-report__questions">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `question-panel-${index}`;
        const triggerId = `question-trigger-${index}`;

        return (
          <li
            key={`${item.question}-${index}`}
            className="interview-report__question"
          >
            <button
              type="button"
              id={triggerId}
              className="interview-report__question-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(isOpen ? null : index)}
            >
              <span className="interview-report__question-index">
                {index + 1}
              </span>
              <span className="interview-report__question-text">
                {item.question}
              </span>
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
                className="interview-report__question-answer"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function InterviewReport() {
  const { id } = useParams();
  const { fetchReportById, isLoading, error } = useAnalysis();
  const { isSignedIn, isLoaded } = useAuth();

  const [openQuestion, setOpenQuestion] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadReport = async () => {
      const result = await fetchReportById(id);
      setReport(normalizeReport(result));
    };

    loadReport();
  }, [id]);

  const groupedSkills = useMemo(() => {
    if (!report) return [];

    return PRIORITY_ORDER.map((level) => ({
      level,
      label: PRIORITY_LABELS[level],
      skills: report.skillGaps.filter((item) => item.importance === level),
    })).filter((group) => group.skills.length > 0);
  }, [report]);

  if (!isLoaded || isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  if (error) {
    return (
      <div className="interview-report">
        <Navbar />
        <main className="interview-report__main">
          <div className="interview-report__status interview-report__status--error">
            <p>{error}</p>
            <Link to="/dashboard" className="interview-report__back-link">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="interview-report">
        <Navbar />
        <main className="interview-report__main">
          <div className="interview-report__status">
            <p>Report not found.</p>
            <Link to="/dashboard" className="interview-report__back-link">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const scoreLevel = getScoreLevel(report.matchScore);
  const reportDate = formatReportDate(report.createdAt);
  const scorePercent = Math.max(
    0,
    Math.min(100, Number(report.matchScore) || 0),
  );

  return (
    <div className="interview-report">
      <Navbar />

      <main className="interview-report__main">
        <header className="interview-report__header">
          <div className="interview-report__header-text">
            <p className="interview-report__eyebrow">
              Interview Preparation Report
            </p>
            <h1 className="interview-report__title">{report.jobTitle}</h1>
            {reportDate && (
              <p className="interview-report__meta">
                Generated on {reportDate}
              </p>
            )}
          </div>

          <div
            className={`interview-report__score-block interview-report__score-block--${scoreLevel}`}
            style={{ "--score-percent": `${scorePercent}%` }}
          >
            <span className="interview-report__score-label">Match Score</span>
            <span className="interview-report__score-value">
              {report.matchScore}%
            </span>
            <span className="interview-report__score-bar" aria-hidden="true">
              <span className="interview-report__score-bar-fill" />
            </span>
          </div>
        </header>

        {(report.summary || report.recommendation) && (
          <section className="interview-report__section">
            <h2 className="interview-report__section-title">
              Assessment Overview
            </h2>
            <div className="interview-report__overview">
              {report.summary && (
                <article className="interview-report__overview-item">
                  <h3>Summary</h3>
                  <p>{report.summary}</p>
                </article>
              )}
              {report.recommendation && (
                <article className="interview-report__overview-item">
                  <h3>Recommendation</h3>
                  <p>{report.recommendation}</p>
                </article>
              )}
            </div>
          </section>
        )}

        <section className="interview-report__section">
          <h2 className="interview-report__section-title">
            Submitted Materials
          </h2>
          <div className="interview-report__materials">
            <div className="interview-report__material">
              <h3>Resume</h3>
              {report.resume ? (
                <a
                  href={report.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interview-report__resume-link"
                >
                  View uploaded resume
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M14 3h7v7M10 14L21 3M18 21H6a2 2 0 0 1-2-2V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <p className="interview-report__empty">
                  No resume link available.
                </p>
              )}
            </div>

            <div className="interview-report__material interview-report__material--wide">
              <h3>Job Description</h3>
              {report.jobDescription ? (
                <div className="interview-report__job-description">
                  <p>{report.jobDescription}</p>
                </div>
              ) : (
                <p className="interview-report__empty">
                  No job description provided.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="interview-report__section">
          <h2 className="interview-report__section-title">
            Skill Gap Analysis
          </h2>
          <p className="interview-report__section-desc">
            Skills that need attention before this role, ranked by importance.
          </p>
          {groupedSkills.length > 0 ? (
            <div className="interview-report__skill-table">
              {groupedSkills.map((group) => (
                <div key={group.level} className="interview-report__skill-row">
                  <span
                    className={`interview-report__priority interview-report__priority--${group.level}`}
                  >
                    {group.label}
                  </span>
                  <ul className="interview-report__skill-list">
                    {group.skills.map((item) => (
                      <li key={item.skill}>{item.skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="interview-report__empty">No skill gaps identified.</p>
          )}
        </section>

        <section className="interview-report__section">
          <h2 className="interview-report__section-title">
            Technical Interview Questions
          </h2>
          <p className="interview-report__section-desc">
            Expand each question to review guidance on how to approach your
            answer.
          </p>
          <QuestionList
            items={report.technicalQuestions}
            openIndex={openQuestion}
            onToggle={setOpenQuestion}
          />
        </section>

        <div className="interview-report__actions">
          <Link to="/dashboard" className="interview-report__back-btn">
            Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default InterviewReport;
