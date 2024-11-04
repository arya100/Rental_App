// src/services/profileService.ts

const BASE_URL = 'https://api.example.com/api';

export const getProfile = async (driverId: string) => {
  const response = await fetch(`${BASE_URL}/driver/${driverId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  return response.json();
};

export const deleteCar = async (driverId: string, carId: string) => {
  const response = await fetch(`${BASE_URL}/driver/${driverId}/car/${carId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete car');
  }
  return response.json();
};

export const addCar = async (driverId: string, carData: any) => {
  const response = await fetch(`${BASE_URL}/driver/${driverId}/car`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error('Failed to add car');
  }
  return response.json();
};

export const editCar = async (driverId: string, carId: string, carData: any) => {
  const response = await fetch(`${BASE_URL}/driver/${driverId}/car/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error('Failed to update car');
  }
  return response.json();
};
