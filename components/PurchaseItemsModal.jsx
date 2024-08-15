import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../utils/styles'; // Import the styles from styles.js

const PurchaseItemsModal = ({ isOpen, onClose, onPurchaseItem, items }) => {
  const player = useSelector(state => state.player);

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Purchase Items</Text>
          <ScrollView>
            {items.filter(item => item.locationDependency.includes(player.location)).map(item => {
              const playerItem = player.purchasedItems.find(pItem => pItem.name === item.name);
              const isPurchased = playerItem && (playerItem.coinPurchased || playerItem.divinePointPurchase);

              return (
                <View key={item.name} style={styles.locationItem}>
                  <TouchableOpacity
                    style={isPurchased ? [styles.purchasedItemButton, styles.disabledButton] : styles.purchaseButton}
                    onPress={() => onPurchaseItem(item.cost, item.name)}
                    disabled={player.wealth < item.cost || isPurchased}
                  >
                    <Text>{isPurchased ? `Purchased - ${item.name}` : `${item.name} (Cost: ${item.cost} coins)`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.modalButtons}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

PurchaseItemsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPurchaseItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default PurchaseItemsModal;