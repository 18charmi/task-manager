import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: navigate user back to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;