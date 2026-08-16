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
  const submitAnalysis = async (jobDescription, file) => {
    const result = await generateAnalysis(jobDescription, file);
    return result.data;
  };

  /**
   * Fetch all reports and update the shared list cache.
   * Throws a string error message on failure — caller handles state.
   */
  const fetchAllReports = async () => {
    const result = await getAllInterviewReports();
    setAllReports(result.data);
    return result.data;
  };

  /**
   * Fetch a single report by ID. Returns the report data on success.
   * Throws a string error message on failure — caller handles state.
   */
  const fetchReportById = async (id) => {
    const result = await getInterviewReport(id);
    return result.data;
  };

  return {
    submitAnalysis,
    fetchAllReports,
    fetchReportById,
    allReports,
  };
};
