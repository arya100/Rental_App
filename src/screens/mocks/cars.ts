// src/mocks/cars.ts

export default [
  {
    id: '1',
    driverName: 'John Doe',
    carType: 'SUV',
    rating: 4.5,
    availability: 'With Driver',
    distance: '5 miles',
    contact: '123-456-7890',
    costPerDay: '$100',
    photo: 'https://example.com/car1.jpg',
    photos: [
      'https://example.com/car1.jpg',
      'https://example.com/car2.jpg',
    ],
    driveType: 'With Driver',
  },
  {
    id: '2',
    driverName: 'Jane Smith',
    carType: 'Sedan',
    rating: 4.2,
    availability: 'Self',
    distance: '3 miles',
    contact: '098-765-4321',
    costPerDay: '$80',
    photo: 'https://example.com/car2.jpg',
    photos: [
      'https://example.com/car2.jpg',
      'https://example.com/car3.jpg',
    ],
    driveType: 'Self',
  },
];
