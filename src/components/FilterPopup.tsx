// src/components/FilterPopup.tsx

import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

interface FilterPopupProps {
  visible: boolean;
  onClose: () => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  selectedDriveType: string;
  setSelectedDriveType: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  visible,
  onClose,
  selectedType,
  setSelectedType,
  selectedRating,
  setSelectedRating,
  selectedDriveType,
  setSelectedDriveType,
  onApply,
  onClear,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.filterTitle}>Filter Options</Text>

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

              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={onApply} style={styles.filterButton}>
                  Apply Filters
                </Button>
                <Button mode="outlined" onPress={onClear} style={styles.clearButton}>
                  Clear Filters
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default FilterPopup;
