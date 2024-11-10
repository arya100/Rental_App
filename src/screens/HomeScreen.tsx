import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoCarGo</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Own a Car?
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CarList')}
        style={styles.button}
      >
        Find Your Ride
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
});

export default HomeScreen;
