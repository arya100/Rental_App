import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Card, Text, Button, RadioButton, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import carsData from './mocks/cars';

const CarListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedDriveType, setSelectedDriveType] = useState(''); // New Drive Type filter
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  const applyFilters = () => {
    const filteredData = carsData.filter((car) => {
      const matchesType = selectedType ? car.carType === selectedType : true;
      const matchesRating = selectedRating ? car.rating >= parseFloat(selectedRating) : true;
      const matchesDriveType = selectedDriveType ? car.driveType === selectedDriveType : true; // Filter by Drive Type
      const matchesSearch = car.driverName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRating && matchesDriveType && matchesSearch;
    });
    setFilteredCars(filteredData);
    setIsFilterModalVisible(false); // Close filter modal after applying filters
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedRating('');
    setSelectedDriveType(''); // Reset Drive Type filter
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
      <Modal
        transparent
        visible={isFilterModalVisible}
        animationType="fade"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.filterTitle}>Filter Options</Text>

                {/* Car Type Filter */}
                <Text style={styles.filterLabel}>Car Type:</Text>
                <View style={styles.radioButtonRow}>
                  {['SUV', 'Sedan', 'Compact', 'Luxury'].map((type) => (
                    <View style={styles.radioButtonContainer} key={type}>
                      <RadioButton
                        value={type}
                        status={selectedType === type ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedType(type)}
                      />
                      <Text>{type}</Text>
                    </View>
                  ))}
                </View>

                {/* Rating Filter */}
                <Text style={styles.filterLabel}>Minimum Rating:</Text>
                <View style={styles.radioButtonRow}>
                  {['4.0', '4.5'].map((rating) => (
                    <View style={styles.radioButtonContainer} key={rating}>
                      <RadioButton
                        value={rating}
                        status={selectedRating === rating ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedRating(rating)}
                      />
                      <Text>{rating}+</Text>
                    </View>
                  ))}
                </View>

                {/* Drive Type Filter */}
                <Text style={styles.filterLabel}>Drive Type:</Text>
                <View style={styles.radioButtonRow}>
                  {['Self', 'With Driver'].map((driveType) => (
                    <View style={styles.radioButtonContainer} key={driveType}>
                      <RadioButton
                        value={driveType}
                        status={selectedDriveType === driveType ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedDriveType(driveType)}
                      />
                      <Text>{driveType}</Text>
                    </View>
                  ))}
                </View>

                {/* Filter Buttons */}
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={applyFilters} style={styles.filterButton}>
                    Apply Filters
                  </Button>
                  <Button mode="outlined" onPress={clearFilters} style={styles.clearButton}>
                    Clear Filters
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterButton: {
    flex: 1,
    marginRight: 5,
  },
  clearButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default CarListScreen;
