import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { locations } from '../data/gameData'; // Ensure this path is correct
import { deductWealth } from '../utils/utils';
import styles from '../utils/styles'; // Import the styles from styles.js

const LocationChangeModal = ({ isOpen, onClose, onLocationChange }) => {
  const player = useSelector(state => state.player);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = (locationName, cost) => {
    const isPurchased = player.purchasedLocations.includes(locationName);
    const finalCost = isPurchased ? 0 : cost;
    const canAfford = player.wealth >= finalCost;
    
    if (canAfford) {
      const updatedWealth = deductWealth(player.wealth, finalCost);
      onLocationChange(locationName, updatedWealth);
      dispatch({ type: 'SET_PLAYER_STATE', payload: { location: locationName, wealth: updatedWealth } });
      onClose(); // Close modal after confirming
    } else {
      Alert.alert('Error', 'Cannot change location due to insufficient funds.');
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeAreaModalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Location</Text>
          <ScrollView>
            {Object.keys(locations).map(locationName => {
              const location = locations[locationName];
              const isCurrentLocation = player.location === locationName;
              const isPurchased = player.purchasedLocations.includes(locationName);
              const finalCost = isPurchased ? 0 : location.cost;
              const canChangeLocation = player.wealth >= finalCost;

              return (
                <View key={locationName} style={styles.locationItem}>
                  <Button
                    title={isCurrentLocation ? `Your Current Location - ${locationName}` : `${locationName} - Cost: ${finalCost} coins`}
                    onPress={() => handleConfirm(locationName, finalCost)}
                    disabled={!canChangeLocation || isCurrentLocation}
                    color={isCurrentLocation ? 'lightgreen' : 'default'}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.modalButtons}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

LocationChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default LocationChangeModal;