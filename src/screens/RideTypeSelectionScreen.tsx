import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const RideTypeSelectionScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Ride Type</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CarList', { type: 'self-drive' })}
        style={styles.button}
      >
        Self-drive Cars
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CarList', { type: 'with-driver' })}
        style={styles.button}
      >
        Cars with a Driver
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

export default RideTypeSelectionScreen;
