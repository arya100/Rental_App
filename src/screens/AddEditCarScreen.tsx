import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

interface CarDetails {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  photos: string[];
  availability: string;
  driverName?: string;
  driverNumber?: string;
}
type AddEditCarScreenRouteProp = RouteProp<RootStackParamList, 'AddEditCar'>;

const AddEditCarScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AddEditCarScreenRouteProp>();

    const isEditMode = route.params?.isEditMode || false;
  const existingCarData = route.params?.carData;

  const [cars, setCars] = useState<CarDetails[]>([
    { brand: '', model: '', year: '', licensePlate: '', photos: [], availability: 'Car Only' }
  ]);

  const handleCarPhotoUpload = (index: number) => {
    if (cars[index].photos.length >= 6) {
      alert('You can upload a maximum of 6 photos per car.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUri = response.assets[0].uri;
        if (newPhotoUri) {
          setCars((prevCars) =>
            prevCars.map((car, carIndex) =>
              carIndex === index ? { ...car, photos: [...car.photos, newPhotoUri] } : car
            )
          );
        }
      }
    });
  };

  const handleAddCar = () => {
    setCars([...cars, { brand: '', model: '', year: '', licensePlate: '', photos: [], availability: 'Car Only' }]);
  };

  const handleCarChange = (index: number, field: keyof CarDetails, value: string) => {
    setCars((prevCars) =>
      prevCars.map((car, carIndex) =>
        carIndex === index ? { ...car, [field]: value } : car
      )
    );
  };

  const handleAvailabilityChange = (index: number, value: string) => {
    setCars((prevCars) =>
      prevCars.map((car, carIndex) =>
        carIndex === index ? { ...car, availability: value, driverName: undefined, driverNumber: undefined } : car
      )
    );
  };


  useEffect(() => {
    if (isEditMode && existingCarData) {
      setCars([{ ...existingCarData }]);
    }
  }, [isEditMode, existingCarData]);

  const handleSubmit = () => {
    const carData = cars[0]; // In this example, assuming a single car is being added or edited.
    
    navigation.navigate('Profile', {
      carData, // Pass the new or updated car data back to ProfileScreen
      isEditMode,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Car Details</Text>

      {/* Car Details */}
      {cars.map((car, index) => (
        <View key={index} style={styles.carContainer}>
          <Text style={styles.carTitle}>Car {index + 1}</Text>

          <TextInput
            label="Car Brand"
            value={car.brand}
            onChangeText={(value) => handleCarChange(index, 'brand', value)}
            style={styles.input}
          />
          <TextInput
            label="Car Model"
            value={car.model}
            onChangeText={(value) => handleCarChange(index, 'model', value)}
            style={styles.input}
          />
          <TextInput
            label="Car Year"
            value={car.year}
            onChangeText={(value) => handleCarChange(index, 'year', value)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="License Plate"
            value={car.licensePlate}
            onChangeText={(value) => handleCarChange(index, 'licensePlate', value)}
            style={styles.input}
          />

          {/* Car Photos */}
          <Button
            mode="contained"
            onPress={() => handleCarPhotoUpload(index)}
            style={styles.button}
          >
            Upload Car Photos (Max 6)
          </Button>
          <View style={styles.photosContainer}>
            {car?.photos.map((uri, photoIndex) => (
              <Image key={photoIndex} source={{ uri }} style={styles.photo} />
            ))}
          </View>

          {/* Availability Options */}
          <Text style={styles.label}>Choose Availability</Text>
          <RadioButton.Group onValueChange={(value) => handleAvailabilityChange(index, value)} value={car.availability}>
            <View style={styles.radioButtonRow}>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="Car Only" />
                <Text>Car Only</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="With Driver" />
                <Text>With Driver</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="Both" />
                <Text>Both</Text>
              </View>
            </View>
          </RadioButton.Group>

          {/* Driver Details (shown only if With Driver or Both is selected) */}
          {(car.availability === 'With Driver' || car.availability === 'Both') && (
            <>
              <TextInput
                label="Driver Name"
                value={car.driverName || ''}
                onChangeText={(value) => handleCarChange(index, 'driverName', value)}
                style={styles.input}
              />
              <TextInput
                label="Driver Phone Number"
                value={car.driverNumber || ''}
                onChangeText={(value) => handleCarChange(index, 'driverNumber', value)}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </>
          )}
        </View>
      ))}

      {/* Add Car Button */}
      <Button mode="outlined" onPress={handleAddCar} style={styles.addButton}>
        Add Another Car
      </Button>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  carContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  addButton: {
    marginTop: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddEditCarScreen;
