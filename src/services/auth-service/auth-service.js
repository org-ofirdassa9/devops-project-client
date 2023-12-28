import { getUserProfile } from '../user-service/user-service';
import api from '../api/api';

const API_URL = 'http://localhost:8000/api/users_service/auth'; // Adjust with your API URL


// In auth-service.js
export const signUp = async (firstName, lastName, email, password) => {
    try {
        await api.post(`${API_URL}/signup`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        });

        return { success: true };
    } catch (error) {
        // Return the error detail from the server response
        return { 
            success: false, 
            message: error.response?.data?.detail || 'An error occurred. Please try again.' 
        };
    }
};


export const signIn = async (email, password) => {
    const response = await api.post(`${API_URL}/login`, {
        email,
        password
    },{
        withCredentials: true,
    });
    
    // Assuming the access token is in the response body
    if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
    }
     // Proceed to fetch user profile
     try {
        const userProfile = await getUserProfile();
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error appropriately
    }
    return response.data;
};

export const signOut = async () => {
    await api.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('access_token'); // Clear the access token from local storage
    sessionStorage.removeItem('userProfile'); // Clear the user profile from session storage
    window.location.href = '/'; // Navigate to the home page after signing out
};

export const isAuthenticated = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        console.log('No access token found');
        return false;
    }

    try {
        // Include the access token in the Authorization header
        await api.get(`http://localhost:8000/api/users_service/user/me`, { 
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const refreshToken = async () => {
    // This endpoint is called to get a new access token using the refresh token
    // Assuming your FastAPI backend handles the refresh token automatically since it's in an HTTP-only cookie
    try {
        const response = await api.post(`${API_URL}/refresh`, {}, { withCredentials: true });

        // Update the access token in local storage
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};
