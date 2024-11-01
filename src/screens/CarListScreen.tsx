import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { Card, Text, Button,RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import carsData from './mocks/cars';

const CarListScreen = ({ route }: any) => {
  const { type } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [filteredCars, setFilteredCars] = useState(carsData);


  const navigation = useNavigation();

  const applyFilters = () => {
    const filteredData = carsData.filter((car) => {
      const matchesType = selectedType ? car.carType === selectedType : true;
      const matchesRating = selectedRating ? car.rating >= parseFloat(selectedRating) : true;
      const matchesSearch = car.driverName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRating && matchesSearch;
    });
    setFilteredCars(filteredData);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedRating('');
    setFilteredCars(carsData);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedType, selectedRating]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Search by driver name..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
      />

      {/* Compact Car Type Filter */}
      <Text style={styles.filterLabel}>Car Type:</Text>
      <View style={styles.radioButtonRow}>
        <RadioButton
          value="SUV"
          status={selectedType === 'SUV' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedType('SUV')}
        />
        <Text>SUV</Text>
        <RadioButton
          value="Sedan"
          status={selectedType === 'Sedan' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedType('Sedan')}
        />
        <Text>Sedan</Text>
        <RadioButton
          value="Compact"
          status={selectedType === 'Compact' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedType('Compact')}
        />
        <Text>Compact</Text>
        <RadioButton
          value="Luxury"
          status={selectedType === 'Luxury' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedType('Luxury')}
        />
        <Text>Luxury</Text>
      </View>

      {/* Compact Rating Filter */}
      <Text style={styles.filterLabel}>Minimum Rating:</Text>
      <View style={styles.radioButtonRow}>
        <RadioButton
          value="4.0"
          status={selectedRating === '4.0' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedRating('4.0')}
        />
        <Text>4.0+</Text>
        <RadioButton
          value="4.5"
          status={selectedRating === '4.5' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedRating('4.5')}
        />
        <Text>4.5+</Text>
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

      {/* Car List */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CarDetails', {
              photos: item.photos,  // Array of photos for the slider
              driverName: item.driverName,
              carType: item.carType,
              rating: item.rating,
              availability: item.availability,
              distance: item.distance,
              contact: item.contact,
              costPerDay: item.costPerDay,
            })}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    marginRight: 5,
  },
  clearButton: {
    flex: 1,
    marginLeft: 5,
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
