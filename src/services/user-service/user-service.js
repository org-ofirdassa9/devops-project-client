import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/user';

export const getUserProfile = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('Access token not found');
    }

    const response = await axios.get(`${API_URL}/me`, {
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
    const dataWithIntegers = {
        ...updatedData,
        blood_pressure: parseInt(updatedData.blood_pressure, 10),
        heart_rate: parseInt(updatedData.heart_rate, 10),
        body_temperature: parseInt(updatedData.body_temperature, 10),
        blood_sugar_level: parseInt(updatedData.blood_sugar_level, 10),
    };
    try {
        await axios.put(`${API_URL}/${userId}`, dataWithIntegers, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return {success: true}
    } catch (error) {
        return { success: false, message: error.response?.data?.detail || 'An error occurred. Please try again.' };
    }
};