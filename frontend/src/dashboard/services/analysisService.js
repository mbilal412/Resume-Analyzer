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
        console.log('Analysis generated successfully:', response.data);
    } catch (error) {
        console.error('Error generating analysis:', error);
        
    }
};
