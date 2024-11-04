import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { Card, Text, Button, IconButton, Menu } from 'react-native-paper';
import { useNavigation, StackActions, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

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

  const [username, setUsername] = useState('John Doe'); // Example username
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100'); // Example avatar URL
  const [cars, setCars] = useState<Car[]>([
    { id: '1', brand: 'Toyota', model: 'Camry', year: '2021', licensePlate: 'ABC123', photos: [], availability: 'Car Only' },
    { id: '2', brand: 'Honda', model: 'Civic', year: '2019', licensePlate: 'XYZ789', photos: [], availability: 'Car Only' },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle Menu
  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Handle Sign Out
  const handleSignOut = () => {
    setMenuVisible(false);
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          // Navigate to login page and reset navigation stack
          navigation.dispatch(StackActions.replace('Login'));
        },
      },
    ]);
  };

  useEffect(() => {
    if (route.params?.carData) {
      const { carData, isEditMode } = route.params;

      if (isEditMode) {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === carData.id ? { ...car, ...carData } : car
          )
        );
      } else {
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

  // Set navigation options for ProfileScreen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Remove back button
      headerRight: () => (
        <Menu
          visible={menuVisible}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              icon="menu"
              size={24}
              onPress={toggleMenu}
            />
          }
        >
          <Menu.Item onPress={handleSignOut} title="Sign Out" />
        </Menu>
      ),
    });
  }, [navigation, menuVisible]);

  return (
    <View style={styles.container}>
      {/* Header with Avatar and Username */}
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
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
