// src/services/apiService.ts

import axios from 'axios';

const BASE_URL = 'https://6dd0dafa677b4b27ba91719017a6ffd9.api.mockbin.io';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Fetch all cars with optional filters
export const getCars = async (filters?: {
  type?: string;
  rating?: number;
  availability?: string;
  distance?: number;
}) => {
  try {
    // Build query parameters based on filters provided
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.availability) params.append('availability', filters.availability);
    if (filters?.distance) params.append('distance', filters.distance.toString());

    // Make request with query params if available
    const response = await axios.get('/cars', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Fetch specific car details
export const getCarDetails = async (carId: string) => {
    try {
      const response = await axios.get(`/cars/${carId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car details:', error);
      throw error;
    }
  };