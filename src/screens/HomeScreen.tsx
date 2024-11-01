import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateDriver')}
        style={styles.button}
      >
        Driver
      </Button>
      
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RideTypeSelection')}
        style={styles.button}
      >
        User
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
    marginBottom: 30,
  },
  button: {
    marginBottom: 15,
  },
});

export default HomeScreen;
