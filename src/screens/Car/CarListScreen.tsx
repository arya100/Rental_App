import React, { useState, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback, 
  Text 
} from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import carsData from '../mocks/cars';

// Custom Checkbox Component with Tick Mark
const CustomCheckbox = ({ 
  isChecked, 
  onPress, 
  label 
}: { 
  isChecked: boolean; 
  onPress: () => void; 
  label: string;
}) => (
  <TouchableOpacity 
    style={styles.checkboxContainer} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, isChecked && styles.checked]}>
      {isChecked && (
        <Text style={styles.checkmarkText}>✓</Text>
      )}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const CarListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([]);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleFilter = useCallback((arraySetter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    arraySetter(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  }, []);

  const applyFilters = useCallback(() => {
    const filteredData = carsData.filter((car) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.carType);
      const matchesRating = selectedRatings.length === 0 ||
        selectedRatings.some((rating) => car.rating >= parseFloat(rating));
      const matchesDriveType = selectedDriveTypes.length === 0 ||
        selectedDriveTypes.includes(car.driveType);
      const matchesSearch = car.driverName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesRating && matchesDriveType && matchesSearch;
    });
    
    setFilteredCars(filteredData);
    setIsFilterModalVisible(false);
  }, [selectedTypes, selectedRatings, selectedDriveTypes, searchQuery]);

  const clearFilters = useCallback(() => {
    setSelectedTypes([]);
    setSelectedRatings([]);
    setSelectedDriveTypes([]);
    // Not closing modal on reset
  }, []);

  const handleModalBackgroundPress = useCallback((e: any) => {
    // Prevent closing when clicking inside the modal content
    if (e.target === e.currentTarget) {
      // Do nothing when clicking outside
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by driver name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <IconButton
          icon="filter"
          onPress={() => setIsFilterModalVisible(true)}
          style={styles.filterIcon}
        />
      </View>

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CarDetails', item)}
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.photo }} style={styles.photo} />
              <Card.Content>
                <Text style={styles.driverName}>{item.driverName}</Text>
                <Text>Car Type: {item.carType}</Text>
                <Text>Rating: {item.rating}⭐</Text>
                <Text>Availability: {item.availability}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      <Modal
        transparent
        visible={isFilterModalVisible}
        animationType="fade"
      >
        <View style={styles.modalBackground} onTouchEnd={handleModalBackgroundPress}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.filterTitle}>Filter Options</Text>
              <IconButton
                icon="close"
                size={20}
                onPress={() => setIsFilterModalVisible(false)}
                style={styles.closeButton}
              />
            </View>

            <Text style={styles.filterLabel}>Car Type:</Text>
            <View style={styles.filterRow}>
              {['SUV', 'Sedan', 'Compact', 'Luxury'].map((type) => (
                <CustomCheckbox
                  key={type}
                  label={type}
                  isChecked={selectedTypes.includes(type)}
                  onPress={() => toggleFilter(setSelectedTypes, type)}
                />
              ))}
            </View>

            <Text style={styles.filterLabel}>Minimum Rating:</Text>
            <View style={styles.filterRow}>
              {['4.0', '4.5'].map((rating) => (
                <CustomCheckbox
                  key={rating}
                  label={`${rating}+`}
                  isChecked={selectedRatings.includes(rating)}
                  onPress={() => toggleFilter(setSelectedRatings, rating)}
                />
              ))}
            </View>

            <Text style={styles.filterLabel}>Drive Type:</Text>
            <View style={styles.filterRow}>
              {['Self', 'With Driver'].map((driveType) => (
                <CustomCheckbox
                  key={driveType}
                  label={driveType}
                  isChecked={selectedDriveTypes.includes(driveType)}
                  onPress={() => toggleFilter(setSelectedDriveTypes, driveType)}
                />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button 
                mode="outlined" 
                onPress={clearFilters} 
                style={styles.clearButton}
              >
                Reset
              </Button>
              <Button 
                mode="contained" 
                onPress={applyFilters} 
                style={styles.filterButton}
              >
                Apply Filters
              </Button>
            </View>
          </View>
        </View>
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
    borderRadius: 5,
  },
  filterIcon: {
    marginLeft: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
    borderRadius: 8,
  },
  photo: {
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 8,
    minWidth: '40%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2196F3',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterButton: {
    flex: 1,
    marginLeft: 5,
  },
  clearButton: {
    flex: 1,
    marginRight: 5,
  },
});

export default CarListScreen;