import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity, SafeAreaView, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from '../utils/styles'; // Import the styles from styles.js

const SettingsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [confirmVisible, setConfirmVisible] = useState(false);
  
    const handleHardReset = () => {
      setConfirmVisible(true);
    };
  
    const confirmHardReset = () => {
      // Dispatch an action to reset the player state
      dispatch({ type: 'RESET_PLAYER_STATE' });
      setConfirmVisible(false);
      onClose();
    };
  
    const cancelHardReset = () => {
      setConfirmVisible(false);
    };
  
    useEffect(() => {
      if (!isOpen) {
        setConfirmVisible(false);
      }
    }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
              <SafeAreaView style={styles.safeAreaModalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Settings</Text>
          <TouchableOpacity style={styles.SettingsTouchableButtonHardReset} onPress={handleHardReset}>
            <Text style={styles.SettingsTouchableButtonText}>Hard Reset</Text>
          </TouchableOpacity>
          {confirmVisible && (
            <View style={styles.confirmContainer}>
              <Text>Are you sure you want to reset all progress?</Text>
              <View style={styles.settingsModalButtons}>
                <TouchableOpacity style={styles.SettingsTouchableButtonYes} onPress={confirmHardReset}>
                  <Text style={styles.SettingsTouchableButtonTextYes}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SettingsTouchableButtonNo} onPress={cancelHardReset}>
                  <Text style={styles.SettingsTouchableButtonTextNo}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <View style={styles.modalButtons}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
        </SafeAreaView>
    </Modal>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;