import { generateAnalysis, getAllInterviewReports } from "../services/analysisService";
import { DashboardContext } from "../dashboard.context";
import { useContext } from "react";

export const useAnalysis = () => {

  const { setAnalysisResult, setIsLoading, setError, analysisResult, isLoading, error, setAllReports, allReports } = useContext(DashboardContext);


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


  return {
    submitAnalysis,
    fetchAllReports,
    analysisResult,
    allReports,
    isLoading,
    error
  }

};
