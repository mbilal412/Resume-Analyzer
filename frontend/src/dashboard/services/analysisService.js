import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your backend API URL
    withCredentials: true, // Include credentials for cross-origin requests if needed
});

export const generateAnalysis = async (jobDescription, file) => {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', file);

    try {
        const response = await api.post('/generate-preparation-plan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data)
        throw error.response?.data || { message: 'An error occurred while generating the analysis.' };
    }
};
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get('/interview-reports');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred while fetching the interview reports.' };
    }
}

export const getInterviewReport = async (id) =>{

}

