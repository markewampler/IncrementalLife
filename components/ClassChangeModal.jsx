import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ClassList from './ClassList';
import styles from '../utils/styles'; // Import the styles from styles.js

const ClassChangeModal = ({ isOpen, onClose, onClassChange }) => {
  const player = useSelector(state => state.player);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClassSelect = (className) => {
    onClassChange(className);
    dispatch({ type: 'SET_PLAYER_STATE', payload: { className } });
    onClose(); // Close modal after selecting class
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
          <Text style={styles.modalTitle}>Change Class</Text>
          <ClassList player={player} onClassSelect={handleClassSelect} />
          <View style={styles.modalButtons}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ClassChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClassChange: PropTypes.func.isRequired,
};

export default ClassChangeModal;