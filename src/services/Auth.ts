// src/services/authService.ts

import apiClient from './apiClient'; // Import your Axios instance

export const loginDriver = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password }); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// User sign-up (for Sign Up screen)
export const signUpDriver = async (userData: { name: string; email: string; password: string; phone: string }) => {
  try {
    const response = await apiClient.post('/auth/signup', userData); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
