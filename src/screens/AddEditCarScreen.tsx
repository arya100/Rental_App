import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { TextInput, Button, Text, RadioButton, IconButton } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
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

const validationSchema = Yup.object().shape({
  brand: Yup.string().required('Car brand is required'),
  model: Yup.string().required('Car model is required'),
  year: Yup.string().required('Car year is required'),
  licensePlate: Yup.string().required('License plate is required'),
  photos: Yup.array().max(6, 'You can upload a maximum of 6 photos per car'),
  availability: Yup.string().required(),
  driverName: Yup.string().when('availability', {
    is: (value: string) => value === 'With Driver' || value === 'Both',
    then: Yup.string().required('Driver name is required'),
  }),
  driverNumber: Yup.string().when('availability', {
    is: (value: string) => value === 'With Driver' || value === 'Both',
    then: Yup.string().required('Driver number is required'),
  }),
});

const AddEditCarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddEditCarScreenRouteProp>();

  const isEditMode = route.params?.isEditMode || false;
  const existingCarData = route.params?.carData;

  const handleCarPhotoUpload = async (
    setFieldValue: FormikHelpers<CarDetails>['setFieldValue'],
    photos: string[]
  ) => {
    if (photos.length >= 6) {
      Alert.alert('Photo Limit', 'You can upload a maximum of 6 photos per car.');
      return;
    }

    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      const newPhotoUri = result.assets[0].uri;
      setFieldValue('photos', [...photos, newPhotoUri]);
    }
  };

  const initialValues = existingCarData || {
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    photos: [],
    availability: 'Car Only',
  };

  const handleSubmit = (values: CarDetails) => {
    navigation.navigate('Profile', {
      carData: values,
      isEditMode,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Car Details</Text>

          <View style={styles.carContainer}>
            <View style={styles.carHeader}>
              <Text style={styles.carTitle}>Car Details</Text>
            </View>

            <TextInput
              label="Car Brand"
              value={values.brand}
              onChangeText={handleChange('brand')}
              onBlur={handleBlur('brand')}
              style={styles.input}
              error={!!errors.brand}
            />
            <TextInput
              label="Car Model"
              value={values.model}
              onChangeText={handleChange('model')}
              onBlur={handleBlur('model')}
              style={styles.input}
              error={!!errors.model}
            />
            <TextInput
              label="Car Year"
              value={values.year}
              onChangeText={handleChange('year')}
              onBlur={handleBlur('year')}
              style={styles.input}
              keyboardType="numeric"
              error={!!errors.year}
            />
            <TextInput
              label="License Plate"
              value={values.licensePlate}
              onChangeText={handleChange('licensePlate')}
              onBlur={handleBlur('licensePlate')}
              style={styles.input}
              error={!!errors.licensePlate}
            />

            {/* Car Photos */}
            <Button
              mode="contained"
              onPress={() => handleCarPhotoUpload(setFieldValue, values.photos)}
              style={styles.button}
            >
              Upload Car Photos (Max 6)
            </Button>
            <View style={styles.photosContainer}>
              {values.photos?.map((uri, photoIndex) => (
                <Image key={photoIndex} source={{ uri }} style={styles.photo} />
              ))}
            </View>

            {/* Availability Options */}
            <Text style={styles.label}>Choose Availability</Text>
            <RadioButton.Group
              onValueChange={(value) => setFieldValue('availability', value)}
              value={values.availability}
            >
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

            {(values.availability === 'With Driver' || values.availability === 'Both') && (
              <>
                <TextInput
                  label="Driver Name"
                  value={values.driverName || ''}
                  onChangeText={handleChange('driverName')}
                  onBlur={handleBlur('driverName')}
                  style={styles.input}
                  error={!!errors.driverName}
                />
                <TextInput
                  label="Driver Phone Number"
                  value={values.driverNumber || ''}
                  onChangeText={handleChange('driverNumber')}
                  onBlur={handleBlur('driverNumber')}
                  style={styles.input}
                  keyboardType="phone-pad"
                  error={!!errors.driverNumber}
                />
              </>
            )}
          </View>

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Submit
          </Button>
        </ScrollView>
      )}
    </Formik>
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
  carHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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
