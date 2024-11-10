// src/services/profileService.ts

import axios from 'axios';

const BASE_URL = 'https://6dd0dafa677b4b27ba91719017a6ffd9.api.mockbin.io/';
const DRIVER_ID = '123'; // Example driver ID, replace with dynamic if needed

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getProfile = async (driverId: string) => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const deleteCar = async (driverId: string, carId: string) => {
  try {
    const response = await axios.delete(`/driver/${driverId}/car/${carId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

export const addCar = async (driverId: string, carData: any) => {
  try {
    const response = await axios.post(`/driver/${driverId}/car`, carData);
    return response.data;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export const editCar = async (driverId: string, carId: string, carData: any) => {
  try {
    const response = await axios.put(`/driver/${driverId}/car/${carId}`, carData);
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};
