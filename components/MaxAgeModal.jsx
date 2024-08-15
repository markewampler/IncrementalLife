import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { items as gameItems, locations as gameLocations } from '../data/gameData';
import styles from '../utils/styles'; // Import the styles from styles.js

const MaxAgeModal = ({ isOpen, onClose, onSoftReset }) => {
  const player = useSelector(state => state.player);
  const dispatch = useDispatch();

  const [availableDivinePoints, setAvailableDivinePoints] = useState(player.dp);
  const [tempAttributes, setTempAttributes] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(player.defaultLocation);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [updatedLocations, setUpdatedLocations] = useState({});

  useEffect(() => {
    if (isOpen) {
      setAvailableDivinePoints(player.dp);
      setTempAttributes({ ...player.attributes });
      setInitialValues(Object.keys(player.attributes).reduce((acc, key) => {
        acc[key] = player.attributes[key].value;
        return acc;
      }, {}));

      // Ensure 'Forest' is always a purchased location
      const playerPurchasedLocations = [...(player.purchasedLocations || [])];
      if (!playerPurchasedLocations.includes('Forest')) {
        playerPurchasedLocations.push('Forest');
      }

      // Merge playerItems with gameItems to ensure all items are present
      const mergedItems = gameItems.map(item => {
        const playerItem = player.purchasedItems.find(pItem => pItem.name === item.name);
        return playerItem ? { ...item, ...playerItem } : { ...item, coinPurchased: false, divinePointPurchase: false };
      });
      setUpdatedItems(mergedItems);

      setSelectedLocation(player.defaultLocation);
    }
  }, [isOpen, player]);

  const handleAttributeChange = (attribute, amount) => {
    if (availableDivinePoints >= amount && (amount > 0 || tempAttributes[attribute].value + amount >= initialValues[attribute])) {
      setTempAttributes(prevAttributes => ({
        ...prevAttributes,
        [attribute]: {
          ...prevAttributes[attribute],
          value: prevAttributes[attribute].value + amount
        }
      }));
      setAvailableDivinePoints(prevPoints => prevPoints - amount);
    }
  };

  const handlePurchaseItem = (index, divinePointCost) => {
    if (availableDivinePoints >= divinePointCost) {
      setAvailableDivinePoints(prevPoints => prevPoints - divinePointCost);
      setUpdatedItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index].divinePointPurchase = true;
        return newItems;
      });
    }
  };

  const handlePurchaseLocation = (locationKey, divinePointCost) => {
    if (availableDivinePoints >= divinePointCost) {
      setAvailableDivinePoints(prevPoints => prevPoints - divinePointCost);
      setUpdatedLocations(prevLocations => {
        const newLocations = { ...prevLocations };
        if (!player.purchasedLocations.includes(locationKey)) {
          player.purchasedLocations.push(locationKey); // Add location to purchasedLocations
        }
        return newLocations;
      });
    }
  };

  const handleSelectLocation = (locationKey) => {
    setSelectedLocation(locationKey);
  };

  const handleSoftReset = () => {
    const newInitialAttributes = Object.keys(tempAttributes).reduce((acc, key) => {
      acc[key] = {
        value: tempAttributes[key].value,
        increasedValue: 0
      };
      return acc;
    }, {});

    const itemsAfterReset = updatedItems.filter(item => item.divinePointPurchase);
    const locationsAfterReset = Object.keys(updatedLocations).filter(key => updatedLocations[key].divinePointPurchase);

    onSoftReset(newInitialAttributes, itemsAfterReset, locationsAfterReset, selectedLocation);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Max Age Reached</Text>
          <Text>You have {availableDivinePoints} divine points to spend on permanent upgrades below:</Text>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.dpAttributeContainer}>
              <Text style={styles.sectionTitle}>Attribute Values</Text>
              {Object.keys(tempAttributes).map(key => (
                <View key={key} style={styles.attributeControl}>
                  <Text style={styles.attributeName}>{key}</Text>
                  <View style={styles.attributeButtons}>
                    {player.dp >= 5 && (
                      <TouchableOpacity
                        style={styles.attributeButton}
                        onPress={() => handleAttributeChange(key, 5)}
                        disabled={availableDivinePoints < 5}
                      >
                        <Text>+5</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.attributeButton}
                      onPress={() => handleAttributeChange(key, 1)}
                      disabled={availableDivinePoints < 1}
                    >
                      <Text>+1</Text>
                    </TouchableOpacity>
                    <Text style={styles.attributeValue}>{tempAttributes[key].value}</Text>
                    <TouchableOpacity
                      style={styles.attributeButton}
                      onPress={() => handleAttributeChange(key, -1)}
                      disabled={tempAttributes[key].value <= initialValues[key]}
                    >
                      <Text>-1</Text>
                    </TouchableOpacity>
                    {initialValues[key] + 4 < tempAttributes[key].value && (
                      <TouchableOpacity
                        style={styles.attributeButton}
                        onPress={() => handleAttributeChange(key, -5)}
                        disabled={tempAttributes[key].value <= initialValues[key] + 4}
                      >
                        <Text>-5</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.itemsContainer}>
              <Text style={styles.sectionTitle}>Items</Text>
              {gameItems.map((item, index) => {
                const playerItem = updatedItems.find(pItem => pItem.name === item.name);
                const isPurchased = playerItem && playerItem.divinePointPurchase;

                return (
                  <View key={index} style={styles.item}>
                    <TouchableOpacity
                      style={isPurchased ? [styles.purchasedItemButton, styles.disabledButton] : styles.purchaseButton}
                      onPress={() => handlePurchaseItem(index, item.divinePointCost)}
                      disabled={availableDivinePoints < item.divinePointCost || isPurchased}
                    >
                      <Text>{isPurchased ? `Purchased - ${item.name}` : `${item.name} - Cost: ${item.divinePointCost}`}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.locationsContainer}>
              <Text style={styles.sectionTitle}>Locations</Text>
              {Object.keys(gameLocations).map((locationKey, index) => {
                const location = gameLocations[locationKey];
                const isPurchased = player.purchasedLocations.includes(locationKey);

                return (
                  <View key={index} style={styles.item}>
                    <TouchableOpacity
                      style={isPurchased ? [styles.purchasedItemButton, styles.disabledButton] : styles.purchaseButton}
                      onPress={() => handlePurchaseLocation(locationKey, location.divinePointCost)}
                      disabled={availableDivinePoints < location.divinePointCost || isPurchased}
                    >
                      <Text>{isPurchased ? `Purchased - ${locationKey}` : `${locationKey} - Cost: ${location.divinePointCost}`}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <View style={styles.defaultLocationContainer}>
                <Text style={styles.subSectionTitle}>Default Location</Text>
                <Picker
                  selectedValue={selectedLocation}
                  onValueChange={(itemValue) => handleSelectLocation(itemValue)}
                >
                  {Object.keys(gameLocations).map((locationKey, index) => {
                    const isPurchased = player.purchasedLocations.includes(locationKey);
                    return isPurchased ? (
                      <Picker.Item key={index} label={locationKey} value={locationKey} />
                    ) : null;
                  })}
                </Picker>
              </View>
            </View>
          </ScrollView>
          <Text style={availableDivinePoints > 0 ? styles.warningText : styles.successText}>
            {availableDivinePoints > 0
              ? 'You must spend all divine points before proceeding.'
              : 'You have spent all your divine points, proceed!'}
          </Text>
          <Button title="Start over with new values!" onPress={handleSoftReset} disabled={availableDivinePoints > 0} />
        </View>
      </View>
    </Modal>
  );
};

export default MaxAgeModal;