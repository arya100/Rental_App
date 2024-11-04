import React from 'react';
import { View, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CarDetailsScreenProps {
  route: {
    params: {
      photos: string[];
      driverName: string;
      carType: string;
      rating: number;
      availability: string;
      distance: string;
      contact: string; // Assuming this is a phone number
      costPerDay: string;
    };
  };
}

const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ route }) => {
  const { photos, driverName, carType, rating, availability, distance, contact, costPerDay } = route.params;

  // Function to initiate the call
  const handleCallPress = () => {
    Linking.openURL(`tel:${contact}`);
  };

  return (
    <View style={styles.container}>
      {/* Photo Slider */}
      <FlatList
        data={photos}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Car Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Driver: {driverName}</Text>
        <Text style={styles.detailText}>Car Type: {carType}</Text>
        <Text style={styles.detailText}>Rating: {rating}⭐</Text>
        <Text style={styles.detailText}>Availability: {availability}</Text>
        <Text style={styles.detailText}>Distance: {distance}</Text>
        <Text style={styles.detailText}>Cost per Day: ${costPerDay}</Text>
        
        {/* Contact Details with Phone Icon */}
        <TouchableOpacity style={styles.contactContainer} onPress={handleCallPress}>
          <Icon name="phone" size={24} color="#000" />
          <Text style={styles.contactText}>{contact}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photo: {
    width: 300,
    height: 200,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 2,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
});

export default CarDetailsScreen;
