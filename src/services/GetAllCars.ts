// src/services/apiService.ts

import apiClient from './apiClient'; // Import your apiClient

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
    const response = await apiClient.get('/sample/home', { params }); // Using apiClient
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Fetch specific car details
export const getCarDetails = async (carId: string) => {
  try {
    const response = await apiClient.get(`/api/cars/${carId}`); // Correct the URL to include carId
    return response.data;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};
