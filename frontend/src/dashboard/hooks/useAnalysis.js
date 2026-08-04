import { generateAnalysis } from "../services/analysisService";

export const useAnalysis = () => {
  
  const submitAnalysis = async (jobDescription, file) => {
    console.log("submitAnalysis called")
    generateAnalysis(jobDescription, file);
  };

  return { submitAnalysis };
};
