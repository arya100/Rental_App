import axios from 'axios';

const BASE_URL = 'https://6dd0dafa677b4b27ba91719017a6ffd9.api.mockbin.io';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const loginDriver = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// User sign-up (for Sign Up screen)
export const signUpDriver  = async (userData: { name: string; email: string; password: string; phone: string }) => {
  try {
    const response = await axios.post(`/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};