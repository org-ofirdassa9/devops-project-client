import axios from 'axios';

const API_URL_USERS = 'http://localhost:8000/api/users_service/user';
const API_URL_METRICS = 'http://localhost:8001/api/metrics_process/metrics';

export const getUserProfile = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    const response = await axios.get(`${API_URL_USERS}/me`, {
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

    // Ensure specific fields are integers
    try {
        await axios.put(`${API_URL_USERS}/${userId}`, updatedData, {
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
        await axios.put(`${API_URL_METRICS}/${userId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return {success: true}
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || 'An error occurred. Please try again.' };
    }
};