import api from '../api/api';

const REPORT_GENERATOR_API_URL = process.env.REACT_APP_REPORT_GENERATOR_API_URL || "/api/report_generator/reports"; // http://localhost:8002/api/report_generator/reports

export const getComparisonReport = async (userId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    try {
        const response = await api.get(`${REPORT_GENERATOR_API_URL}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            responseType: 'blob' // Set response type to blob for file download
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `comparison_chart_${userId}.png`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || 'An error occurred. Please try again.'
        };
    }
};

export const getOverviewReport = async (userId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    try {
        const response = await api.get(`${REPORT_GENERATOR_API_URL}/overview/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            responseType: 'blob' // Set response type to blob for file download
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `comparison_chart_${userId}.png`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || 'An error occurred. Please try again.'
        };
    }
};

export const getTrendReport = async (userId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    try {
        const response = await api.get(`${REPORT_GENERATOR_API_URL}/trend_analysis/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            responseType: 'blob' // Set response type to blob for file download
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `comparison_chart_${userId}.png`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || 'An error occurred. Please try again.'
        };
    }
};