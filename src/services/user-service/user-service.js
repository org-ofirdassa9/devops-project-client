import api from '../api/api';

const USERS_SERVICE_API_URL = process.env.REACT_APP_USERS_SERVICE_API_URL || "/api/users_service"; // http://localhost:8000/api/users_service
const METRICS_PROCESS_API_URL = process.env.REACT_APP_METRICS_PROCESS_API_URL || "/api/metrics_process"; // http://localhost:8001/api/metrics_process

export const getUserProfile = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }
    const response = await api.get(`${USERS_SERVICE_API_URL}/user/me`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const updateUserProfile = async (userId, updatedData) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    try {
        await api.put(`${USERS_SERVICE_API_URL}/user/${userId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return {success: true}
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || 'An error occurred. Please try again.' };
    }
};

export const updateUserMetrics = async (userId, updatedData) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    // Ensure specific fields are integers
    try {
        await api.put(`${METRICS_PROCESS_API_URL}/metrics/${userId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return {success: true}
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || 'An error occurred. Please try again.' };
    }
};