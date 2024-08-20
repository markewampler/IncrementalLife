import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SettingsModal from './SettingsModal';
import AnimatedButton from './AnimatedButton';
import styles from '../utils/styles';

const MAX_AGE_DEFAULT = 40;

const PlayerInfo = ({ onOpenLocationModal, onOpenPurchaseModal, onOpenClassChangeModal, animateClassButton }) => {
  const player = useSelector(state => state.player);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.playerInfoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.header}>Age: {player.age.toFixed(2)}</Text>
            <Text style={styles.header}>Max: {player.maxAge.toFixed(2) || MAX_AGE_DEFAULT.toFixed(2)}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.header}>Divine Points</Text>
            <Text style={styles.header}>{player.dp}</Text>
          </View>
          <View style={styles.infoColumn}>
            <TouchableOpacity style={styles.playerInfoCustomButton} onPress={openSettingsModal}>
              <Text style={styles.playerInfoCustomButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.header}>Location: {player.location}</Text>
          <TouchableOpacity style={styles.playerInfoCustomButton} onPress={onOpenLocationModal}>
            <Text style={styles.playerInfoCustomButtonText}>Change Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.header}>Wealth: {player.wealth} coins</Text>
          <TouchableOpacity style={styles.playerInfoCustomButton} onPress={onOpenPurchaseModal}>
            <Text style={styles.playerInfoCustomButtonText}>Purchase Items</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.header}>Class: {player.className}</Text>
          <AnimatedButton
            onPress={onOpenClassChangeModal}
            animateClassButton={animateClassButton}
          >
            <Text style={styles.playerInfoCustomButtonText}>Change Class</Text>
          </AnimatedButton>
        </View>
      </View>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </SafeAreaView>
  );
};

PlayerInfo.propTypes = {
  onOpenLocationModal: PropTypes.func.isRequired,
  onOpenPurchaseModal: PropTypes.func.isRequired,
  onOpenClassChangeModal: PropTypes.func.isRequired,
  animateClassButton: PropTypes.bool.isRequired,
};

export default PlayerInfo;