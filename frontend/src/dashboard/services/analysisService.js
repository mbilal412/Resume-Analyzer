import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const generateAnalysis = async (jobDescription, file, token) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", file);

  try {
    
    const response = await api.post("/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong. Please try again.";
  }
};

export const getAllInterviewReports = async (token) => {
  console.log("token", token)
  try {
    
    const response = await api.get("/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong. Please try again.";
  }
};

export const getInterviewReport = async (id, token) => {
  try {
    
    const response = await api.get(`/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong. Please try again.";
  }
};
