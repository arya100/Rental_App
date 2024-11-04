// src/screens/Auth/SignUpScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').nullable(),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number is invalid')
    .required('Phone number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  location: Yup.string().required('Location is required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleSignUp = (values: any) => {
    // Perform sign-up logic here (e.g., API call)
    // After sign-up, navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        location: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            label="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            style={styles.input}
            error={!!errors.username && touched.username}
          />
          {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <TextInput
            label="Email (optional)"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={styles.input}
            error={!!errors.email && touched.email}
          />
          {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            label="Phone Number"
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            style={styles.input}
            keyboardType="phone-pad"
            error={!!errors.phoneNumber && touched.phoneNumber}
          />
          {errors.phoneNumber && touched.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

          <TextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            style={styles.input}
            error={!!errors.password && touched.password}
          />
          {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            secureTextEntry
            style={styles.input}
            error={!!errors.confirmPassword && touched.confirmPassword}
          />
          {errors.confirmPassword && touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TextInput
            label="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            style={styles.input}
            error={!!errors.firstName && touched.firstName}
          />
          {errors.firstName && touched.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            label="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            style={styles.input}
            error={!!errors.lastName && touched.lastName}
          />
          {errors.lastName && touched.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <TextInput
            label="Location"
            value={values.location}
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
            style={styles.input}
            error={!!errors.location && touched.location}
          />
          {errors.location && touched.location && <Text style={styles.errorText}>{errors.location}</Text>}

          <Button mode="contained" onPress={handleSubmit as any} style={styles.button}>
            Sign Up
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUpScreen;
