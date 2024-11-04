// src/screens/Car/CarListScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import carsData from '../mocks/cars';
import FilterPopup from '../../components/FilterPopup';

const CarListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedDriveType, setSelectedDriveType] = useState('');
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  // Function to apply filters
  const applyFilters = () => {
    const filteredData = carsData.filter((car) => {
      const matchesType = selectedType ? car.carType === selectedType : true;
      const matchesRating = selectedRating ? car.rating >= parseFloat(selectedRating) : true;
      const matchesDriveType = selectedDriveType ? car.driveType === selectedDriveType : true;
      const matchesSearch = car.driverName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRating && matchesDriveType && matchesSearch;
    });
    setFilteredCars(filteredData);
    setIsFilterModalVisible(false); // Close filter modal after applying filters
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedRating('');
    setSelectedDriveType('');
    setFilteredCars(carsData);
    setIsFilterModalVisible(false); // Close filter modal
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedType, selectedRating, selectedDriveType]);

  return (
    <View style={styles.container}>
      {/* Search Input with Filter Icon */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by driver name..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
        />
        <IconButton
          icon="filter"
          onPress={() => setIsFilterModalVisible(true)}
          style={styles.filterIcon}
        />
      </View>

      {/* Car List */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CarDetails', {
                photos: item.photos,
                driverName: item.driverName,
                carType: item.carType,
                rating: item.rating,
                availability: item.availability,
                distance: item.distance,
                contact: item.contact,
                costPerDay: item.costPerDay,
              })
            }
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.photo }} style={styles.photo} />
              <Card.Content>
                <Text style={styles.driverName}>{item.driverName}</Text>
                <Text>Car Type: {item.carType}</Text>
                <Text>Rating: {item.rating}⭐</Text>
                <Text>Availability: {item.availability}</Text>
                <Text>Distance: {item.distance}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Filter Modal */}
      <FilterPopup
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedDriveType={selectedDriveType}
        setSelectedDriveType={setSelectedDriveType}
        onApply={applyFilters}
        onClear={clearFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  card: {
    marginBottom: 15,
  },
  photo: {
    height: 150,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CarListScreen;
