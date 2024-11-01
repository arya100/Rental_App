import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Switch } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

interface CarDetails {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  photos: string[];
}

const CreateDriverScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [availability, setAvailability] = useState('Car Only');
  const [isAvailable, setIsAvailable] = useState(true);
  const [cars, setCars] = useState<CarDetails[]>([{ brand: '', model: '', year: '', licensePlate: '', photos: [] }]);

  const handleProfilePictureUpload = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfilePicture(response.assets[0].uri || null);
      }
    });
  };

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
    setCars([...cars, { brand: '', model: '', year: '', licensePlate: '', photos: [] }]);
  };

  const handleCarChange = (index: number, field: keyof CarDetails, value: string) => {
    setCars((prevCars) =>
      prevCars.map((car, carIndex) =>
        carIndex === index ? { ...car, [field]: value } : car
      )
    );
  };

  const handleSubmit = () => {
    alert('Driver and car details submitted');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Driver Profile & Car Details</Text>

      {/* Profile Picture */}
      {/* <Button mode="outlined" onPress={handleProfilePictureUpload} style={styles.button}>
        {profilePicture ? 'Change Profile Picture' : 'Upload Profile Picture'}
      </Button>
      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profilePicture} />} */}

      {/* Name and Phone Number */}
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

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
            {car.photos.map((uri, photoIndex) => (
              <Image key={photoIndex} source={{ uri }} style={styles.photo} />
            ))}
          </View>
        </View>
      ))}

      {/* Add Car Button */}
      <Button mode="outlined" onPress={handleAddCar} style={styles.addButton}>
        Add Another Car
      </Button>

      {/* Availability Options */}
      <Text style={styles.label}>Choose Availability</Text>
      <RadioButton.Group onValueChange={setAvailability} value={availability}>
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
      </RadioButton.Group>

      {/* Availability Toggle */}
      <View style={styles.switchContainer}>
        <Text>Available for Booking:</Text>
        <Switch value={isAvailable} onValueChange={setIsAvailable} />
      </View>

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
    justifyContent: 'center',
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default CreateDriverScreen;
