import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Navbar from "../../shared/components/navbar/Navbar";
import Footer from "../../shared/components/footer/Footer";
import { Link } from "react-router";
import "../../shared/components/ProtectedRoute.scss";
import "./Dashboard.scss";
import { useAnalysis } from "../hooks/useAnalysis";

const REPORTS_PAGE_SIZE = 5;

function getScoreLevel(score) {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
}

function EmptyReports() {
  return (
    <div className="dashboard-empty">
      <div className="dashboard-empty__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
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
      </div>
      <h3 className="dashboard-empty__title">No reports found yet</h3>
      <p className="dashboard-empty__text">
        Upload your resume and paste a job description to generate your first
        AI-powered match report.
      </p>
      <Link to="/dashboard/new-analysis" className="dashboard-empty__cta">
        Start your first analysis
      </Link>
    </div>
  );
}

function ReportsTable({ reports }) {
  const [visibleCount, setVisibleCount] = useState(REPORTS_PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(REPORTS_PAGE_SIZE);
  }, [reports]);

  const visibleReports = reports.slice(0, visibleCount);
  const hasMoreReports = visibleCount < reports.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + REPORTS_PAGE_SIZE, reports.length),
    );
  };

  return (
    <>
      <div className="dashboard-table">
        <div className="dashboard-table__head">
          <span>Target Role &amp; Date</span>
          <span>Match Score</span>
          <span>Action</span>
        </div>
        {visibleReports.map((report) => (
          <div key={report._id} className="dashboard-table__row">
            <div className="dashboard-table__role">
              <span className="dashboard-table__role-name">
                {report.jobTitle}
              </span>
              <span className="dashboard-table__role-date">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="dashboard-table__score">
              <span
                className={`dashboard-table__badge dashboard-table__badge--${getScoreLevel(report.matchScore)}`}
              >
                {report.matchScore}%
              </span>
            </div>
            <div className="dashboard-table__action">
              <Link
                to={`/dashboard/report/${report._id}`}
                className="dashboard-table__view"
              >
                View Report
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {hasMoreReports && (
        <div className="dashboard-table__footer">
          <button
            type="button"
            className="dashboard-table__load-more"
            onClick={handleLoadMore}
          >
            Load More Reports
          </button>
        </div>
      )}
    </>
  );
}

function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { fetchAllReports, allReports } = useAnalysis();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await fetchAllReports();
      } catch (err) {
        if (!cancelled) {
          setError(
            typeof err === "string"
              ? err
              : "Something went wrong. Please try again.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

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

  const firstName =
    user?.firstName ||
    user?.fullName?.split(" ")[0] ||
    user?.username ||
    "there";

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard__main">
        <section className="dashboard-welcome">
          <h1 className="dashboard-welcome__title">
            Welcome back, {firstName}
          </h1>
          <p className="dashboard-welcome__subtitle">
            View your past reports or start a new analysis
          </p>
        </section>

        <section className="dashboard-banner">
          <div className="dashboard-banner__content">
            <h2 className="dashboard-banner__title">
              Ready for your next role?
            </h2>
            <p className="dashboard-banner__text">
              Upload your latest resume and paste a job description to get an
              AI-powered match score and optimization tips in seconds.
            </p>
          </div>
          <Link to="/dashboard/new-analysis" className="dashboard-banner__cta">
            <span className="dashboard-banner__cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Start New Analysis
          </Link>
        </section>

        <section className="dashboard-reports">
          <div className="dashboard-reports__header">
            <h2 className="dashboard-reports__title">Your Reports</h2>
            <div className="dashboard-reports__search">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="dashboard-reports__loading" aria-live="polite">
              <div className="spinner" />
            </div>
          ) : error ? (
            <div
              className="dashboard-reports__error"
              role="alert"
              aria-live="assertive"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p>{error}</p>
              <button
                type="button"
                className="dashboard-reports__retry"
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  fetchAllReports()
                    .catch((err) =>
                      setError(
                        typeof err === "string"
                          ? err
                          : "Something went wrong. Please try again.",
                      ),
                    )
                    .finally(() => setIsLoading(false));
                }}
              >
                Try again
              </button>
            </div>
          ) : allReports.length === 0 ? (
            <EmptyReports />
          ) : (
            <ReportsTable
              reports={allReports.filter((report) =>
                report.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
              )}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
