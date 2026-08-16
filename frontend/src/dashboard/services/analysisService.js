import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const {getToken} = useAuth()



const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const generateAnalysis = async (jobDescription, file) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", file);

  try {
    const token = await getToken()
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

export const getAllInterviewReports = async () => {
  try {
    const token = await getToken()
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

export const getInterviewReport = async (id) => {
  try {
    const token = await getToken()
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
