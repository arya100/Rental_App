// src/services/profileService.ts

import apiClient from './apiClient'; // Import your Axios instance

export const getProfile = async (driverId: string) => {
  try {
    const response = await apiClient.get(`/drivers/${driverId}`); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const deleteCar = async (driverId: string, carId: string) => {
  try {
    const response = await apiClient.delete(`/driver/${driverId}/car/${carId}`); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

export const addCar = async (driverId: string, carData: any) => {
  try {
    const response = await apiClient.post(`/driver/${driverId}/car`, carData); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export const editCar = async (driverId: string, carId: string, carData: any) => {
  try {
    const response = await apiClient.put(`/driver/${driverId}/car/${carId}`, carData); // Using apiClient
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};
