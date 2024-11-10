import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, Text, Button, IconButton, Menu, Avatar } from 'react-native-paper';
import { useNavigation, CommonActions, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

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

  const [username, setUsername] = useState('John Doe');
  const [cars, setCars] = useState<Car[]>([
    { id: '1', brand: 'Toyota', model: 'Camry', year: '2021', licensePlate: 'ABC123', photos: [], availability: 'Car Only' },
    { id: '2', brand: 'Honda', model: 'Civic', year: '2019', licensePlate: 'XYZ789', photos: [], availability: 'Car Only' },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSearchBar = () => setSearchVisible(!searchVisible);

  const getInitials = () => {
    const nameParts = username.split(' ');
    return nameParts.map(part => part[0]).join('').toUpperCase();
  };

  const handleSignOut = () => {
    setMenuVisible(false);
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Remove back button
      headerRight: () => (
        <View style={styles.headerIcons}>
          <IconButton
            icon="magnify"
            size={24}
            onPress={toggleSearchBar}
            style={styles.icon}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableWithoutFeedback onPress={toggleMenu}>
                <Avatar.Text
                  size={28}
                  label={getInitials()}
                  style={styles.avatar}
                />
              </TouchableWithoutFeedback>
            }
          >
            <Menu.Item onPress={() => { setMenuVisible(false); Alert.alert('Profile clicked'); }} title="Profile" />
            <Menu.Item onPress={handleSignOut} title="Sign Out" />
          </Menu>
        </View>
      ),
    });
  }, [navigation, menuVisible]);

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setSearchVisible(false); }}>
      <View style={styles.container}>
        {searchVisible && (
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoFocus
          />
        )}

        <FlatList
          data={cars.filter(car =>
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase())
          )}
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  avatar: {
    backgroundColor: '#6200ea',
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    marginBottom: 15,
  },
  addButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
