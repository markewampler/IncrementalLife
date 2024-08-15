import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
  const [selectedTab, setSelectedTab] = useState('attributes');

  const previouslyPurchasedItems = player.purchasedItems.filter(item => item.divinePointPurchase);
  const previouslyPurchasedLocations = player.purchasedLocations;

  useEffect(() => {
    if (isOpen) {
      setAvailableDivinePoints(player.dp);
      setTempAttributes({ ...player.attributes });
      setInitialValues(Object.keys(player.attributes).reduce((acc, key) => {
        acc[key] = player.attributes[key].value;
        return acc;
      }, {}));

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
  
  const handleUnpurchaseItem = (index, divinePointCost) => {
    setAvailableDivinePoints(prevPoints => prevPoints + divinePointCost);
    setUpdatedItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].divinePointPurchase = false;
      return newItems;
    });
  };

  const handlePurchaseLocation = (locationKey, divinePointCost) => {
    if (availableDivinePoints >= divinePointCost) {
      setAvailableDivinePoints(prevPoints => prevPoints - divinePointCost);
      setUpdatedLocations(prevLocations => {
        const newLocations = { ...prevLocations, [locationKey]: { divinePointPurchase: true } };
        return newLocations;
      });
    }
  };

  const handleUnpurchaseLocation = (locationKey, divinePointCost) => {
    setAvailableDivinePoints(prevPoints => prevPoints + divinePointCost);
    setUpdatedLocations(prevLocations => {
      const newLocations = { ...prevLocations, [locationKey]: { divinePointPurchase: false } };
      return newLocations;
    });
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

  const renderAttributes = () => (
    <View style={styles.dpAttributeContainer}>
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
            <Text style={[
                    styles.maxAgeAttributeValue,
                    tempAttributes[key].value > initialValues[key] && styles.highlightedAttributeValue,
                  ]}
            >{tempAttributes[key].value}</Text>
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
  );

  const renderItems = () => (
    <View style={styles.itemsContainer}>
      {gameItems.map((item, index) => {
        const playerItem = updatedItems.find(pItem => pItem.name === item.name);
        const isPurchased = playerItem && playerItem.divinePointPurchase;
        const isPreviouslyPurchased = previouslyPurchasedItems.find(pItem => pItem.name === item.name);
        const isDisabled = availableDivinePoints < item.divinePointCost && !isPurchased || isPreviouslyPurchased;
  
        return (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              style={[
                isPreviouslyPurchased
                  ? [styles.purchasedItemButton, styles.disabledButton]
                  : isPurchased
                  ? styles.currentRoundPurchasedButton
                  : styles.purchaseButton,
                isDisabled && { opacity: 0.5 }
              ]}
              onPress={() =>
                isPurchased
                  ? handleUnpurchaseItem(index, item.divinePointCost)
                  : handlePurchaseItem(index, item.divinePointCost)
              }
              disabled={isDisabled}
            >
              <Text>{isPurchased ? `Purchased - ${item.name}` : `${item.name} - Cost: ${item.divinePointCost}`}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  const renderLocations = () => (
    <View style={styles.locationsContainer}>
      {Object.keys(gameLocations).map((locationKey, index) => {
        const location = gameLocations[locationKey];
        const isPreviouslyPurchased = previouslyPurchasedLocations.includes(locationKey);
        const isPurchased =
          player.purchasedLocations.includes(locationKey) ||
          updatedLocations[locationKey]?.divinePointPurchase;
        const isDisabled = availableDivinePoints < location.divinePointCost && !isPurchased || isPreviouslyPurchased;
  
        return (
          <View key={index} style={styles.maxAgeLocationItem}>
            <TouchableOpacity
              style={[
                isPreviouslyPurchased
                  ? [styles.purchasedItemButton, styles.disabledButton]
                  : isPurchased
                  ? styles.currentRoundPurchasedButton
                  : styles.purchaseButton,
                isDisabled && { opacity: 0.5 }
              ]}
              onPress={() =>
                isPurchased
                  ? handleUnpurchaseLocation(locationKey, location.divinePointCost)
                  : handlePurchaseLocation(locationKey, location.divinePointCost)
              }
              disabled={isDisabled}
            >
              <Text>
                {isPurchased ? `Purchased - ${locationKey}` : `${locationKey} - Cost: ${location.divinePointCost}`}
              </Text>
            </TouchableOpacity>
            {(isPurchased || isPreviouslyPurchased) && (
              <TouchableOpacity
                style={
                  selectedLocation === locationKey
                    ? [styles.defaultButton, styles.selectedDefaultButton]
                    : styles.defaultButton
                }
                onPress={() => handleSelectLocation(locationKey)}
              >
                <Text>{selectedLocation === locationKey ? 'Default' : 'Set as Default'}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );


  return (
    <Modal
  visible={isOpen}
  transparent={true}
  animationType="slide"
  onRequestClose={onClose}
>
  <SafeAreaView style={styles.safeAreaModalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.MaxAgemodalTitle}>Max Age Reached</Text>
      <Text>You have <Text style={styles.MaxAgemodalTitle}>{availableDivinePoints}</Text> divine points to spend on permanent upgrades below:</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'attributes' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('attributes')}
        >
          <Text style={styles.tabButtonText}>Attributes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'items' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('items')}
        >
          <Text style={styles.tabButtonText}>Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'locations' && styles.tabButtonSelected]}
          onPress={() => setSelectedTab('locations')}
        >
          <Text style={styles.tabButtonText}>Locations</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalContainer}>
        {selectedTab === 'attributes' && renderAttributes()}
        {selectedTab === 'items' && renderItems()}
        {selectedTab === 'locations' && renderLocations()}
      </ScrollView>
      <Text style={availableDivinePoints > 0 ? styles.warningText : styles.successText}>
        {availableDivinePoints > 0
          ? 'You must spend all divine points before proceeding.'
          : 'You have spent all your divine points, proceed!'}
      </Text>
      <Button title="Start over with new values!" onPress={handleSoftReset} disabled={availableDivinePoints > 0} />
    </View>
  </SafeAreaView>
</Modal>
  );
};
export default MaxAgeModal;