
import axios from 'axios';
import { refreshToken } from '../auth-service/auth-service';


const api = axios.create();

api.interceptors.response.use(undefined, async error => {
  if (error.config && error.response && error.response.status === 422) {
    const tokenResult = await refreshToken();
    if (tokenResult) {
      error.config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return api.request(error.config);
    }
  }
  return Promise.reject(error);
});

export default api;