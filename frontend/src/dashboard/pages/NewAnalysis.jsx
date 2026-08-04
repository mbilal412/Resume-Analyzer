import { useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../../shared/components/navbar/Navbar";
import Footer from "../../shared/components/footer/Footer";
import { useAnalysis } from "../hooks/useAnalysis";
import "../../shared/components/ProtectedRoute.scss";
import "./NewAnalysis.scss";

function NewAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { submitAnalysis } = useAnalysis();
  const { isSignedIn, isLoaded } = useAuth();

  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const f = event.dataTransfer?.files?.[0];
    if (f) handleFileSelect(f);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    console.log("handleSubmit called");
    submitAnalysis(jobDescription, selectedFile);
  };

  if (!isLoaded) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <div className="new-analysis">
      <Navbar />

      <main className="new-analysis__main">
        <header className="new-analysis__header">
          <h1 className="new-analysis__title">Start New Analysis</h1>
          <p className="new-analysis__subtitle">
            Paste your resume and the job description to get a personalized
            preparation report
          </p>
        </header>

        <div className="new-analysis__card">
          <div className="new-analysis__field">
            <label className="new-analysis__label" htmlFor="resume-upload">
              Upload Your Resume
            </label>

            <div
              className="new-analysis__dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
              onClick={handleBrowseClick}
            >
              <div className="new-analysis__dropzone-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2v6h6M12 12v6M9 15l3-3 3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {!selectedFile ? (
                <p className="new-analysis__dropzone-text">
                  Drag and drop your PDF here, or{" "}
                  <button
                    type="button"
                    className="new-analysis__browse"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBrowseClick();
                    }}
                  >
                    click to browse
                  </button>
                </p>
              ) : (
                <div className="new-analysis__file-row">
                  <span className="new-analysis__dropzone-text new-analysis__dropzone-text--file">
                    {selectedFile.name}
                  </span>
                  <div className="new-analysis__file-actions">
                    <button
                      type="button"
                      className="new-analysis__choose-another"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrowseClick();
                      }}
                    >
                      Choose another
                    </button>
                    <button
                      type="button"
                      className="new-analysis__remove"
                      aria-label="Remove file"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 6l12 12M6 18L18 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                className="new-analysis__file-input"
                id="resume-upload"
                type="file"
                required
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) handleFileSelect(f);
                }}
              />
            </div>
          </div>

          <div className="new-analysis__field">
            <label className="new-analysis__label" htmlFor="job-description">
              Job Description
            </label>
            <textarea
              required
              id="job-description"
              className="new-analysis__textarea"
              placeholder="Paste the job description here..."
              rows={8}
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            />
          </div>

          <button
            type="button"
            className="new-analysis__submit"
            onClick={handleSubmit}
              disabled={!selectedFile || jobDescription.trim() === ''}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            </svg>
            Generate Report
          </button>
        </div>

        <div className="new-analysis__info">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 10v6M12 7h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p>
            Our AI works best when the job description includes
            responsibilities, requirements, and tech stack. Total processing
            time is usually under 30 seconds.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NewAnalysis;
