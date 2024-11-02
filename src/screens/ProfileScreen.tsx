import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  photos: string[];
  availability: string;
  driverName?: string;
  driverNumber?: string;
}

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  const [cars, setCars] = useState<Car[]>([
    { id: '1', brand: 'Toyota', model: 'Camry', year: '2021', licensePlate: 'ABC123', photos: [], availability: 'Car Only' },
    { id: '2', brand: 'Honda', model: 'Civic', year: '2019', licensePlate: 'XYZ789', photos: [], availability: 'Car Only' },
  ]);

  useEffect(() => {
    if (route.params?.carData) {
      const { carData, isEditMode } = route.params;

      if (isEditMode) {
        // Update the existing car in the list
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === carData.id ? { ...car, ...carData } : car
          )
        );
      } else {
        // Add a new car to the list
        setCars((prevCars) => [...prevCars, { ...carData, id: `${Date.now()}` }]);
      }
    }
  }, [route.params?.carData]);

  const handleAddCar = () => {
    navigation.navigate('AddEditCar', { isEditMode: false });
  };

  const handleEditCar = (car: Car) => {
    navigation.navigate('AddEditCar', { isEditMode: true, carData: car });
  };

  const handleDeleteCar = (carId: string) => {
    Alert.alert('Delete Car', 'Are you sure you want to delete this car?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => setCars(cars.filter(car => car.id !== carId)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cars</Text>
      
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>Brand: {item.brand}</Text>
              <Text>Model: {item.model}</Text>
              <Text>Year: {item.year}</Text>
              <Text>License Plate: {item.licensePlate}</Text>
              <Text>Availability: {item.availability}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleEditCar(item)}>Edit</Button>
              <Button onPress={() => handleDeleteCar(item.id)}>Delete</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button mode="contained" onPress={handleAddCar} style={styles.addButton}>
        Add New Car
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
  },
  addButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
