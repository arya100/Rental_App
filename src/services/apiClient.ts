import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:8080';

// Create Axios instance with default configurations
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: Set a timeout for requests
});

// Add an interceptor to handle errors globally (Optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
