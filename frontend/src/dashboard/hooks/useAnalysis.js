import {
  generateAnalysis,
  getAllInterviewReports,
  getInterviewReport,
} from "../services/analysisService";
import { DashboardContext } from "../dashboard.context";
import { useContext } from "react";

export const useAnalysis = () => {
  const { setAllReports, allReports } = useContext(DashboardContext);

  /**
   * Submit a new analysis. Returns the created report data on success.
   * Throws a string error message on failure — caller handles state.
   */
  const submitAnalysis = async (jobDescription, file, token) => {
    const result = await generateAnalysis(jobDescription, file, token);
    return result.data;
  };

  /**
   * Fetch all reports and update the shared list cache.
   * Throws a string error message on failure — caller handles state.
   */
  const fetchAllReports = async (token) => {
    const result = await getAllInterviewReports(token);
    setAllReports(result.data);
    return result.data;
  };

  /**
   * Fetch a single report by ID. Returns the report data on success.
   * Throws a string error message on failure — caller handles state.
   */
  const fetchReportById = async (id, token) => {
    const result = await getInterviewReport(id, token);
    return result.data;
  };

  return {
    submitAnalysis,
    fetchAllReports,
    fetchReportById,
    allReports,
  };
};
