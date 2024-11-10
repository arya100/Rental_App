import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Perform login logic here (e.g., API call)
    // After successful login, navigate to Profile screen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
     
      <TextInput
        label="Email or Phone"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        left={<TextInput.Icon name="email" />} 
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        left={<TextInput.Icon name="lock" />} 
      />
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.signUpButton}
      >
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  signUpButton: {
    marginTop: 20,
  }
});

export default LoginScreen;
