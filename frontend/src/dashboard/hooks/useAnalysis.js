import { generateAnalysis, getAllInterviewReports, getInterviewReport} from "../services/analysisService";
import { DashboardContext } from "../dashboard.context";
import { useContext } from "react";

export const useAnalysis = () => {

  const { setIsLoading, setError, isLoading, error, setAllReports, allReports } = useContext(DashboardContext);


  const submitAnalysis = async (jobDescription, file) => {
    try {
      setIsLoading(true);
      const result = await generateAnalysis(jobDescription, file);

      setAnalysisResult(result.data);

    } catch (error) {
      setError(error.error)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllReports = async () => {
    console.log("Fetching all reports...");
    try {
      setIsLoading(true);
      const result = await getAllInterviewReports();
      console.log(result.reports)
      setAllReports(result.reports);
      return result.reports;
    } catch (error) {
      setError(error.error);
    } finally {
      console.log("Finished fetching reports.");
      setIsLoading(false);
    }
  };

  const fetchReportById = async (id) => {
    try {
      setIsLoading(true);
      const result = await getInterviewReport(id);
      return result.report;
    } catch (error) {
      setError(error.error);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    submitAnalysis,
    fetchAllReports,
    fetchReportById,
    allReports,
    isLoading,
    error
  }

};
