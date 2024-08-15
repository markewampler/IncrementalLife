import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ClassChangeButton from './ClassChangeButton';
import styles from '../utils/styles'; // Import the styles from styles.js

const ClassChangePanel = ({ availableClasses, onClassChange }) => {
  return (
    <View style={styles.classChangePanel}>
      {availableClasses.map((className = 'Peasant', index) => (
        <ClassChangeButton
          key={index}
          className={className}
          onPress={() => onClassChange(className)}
        />
      ))}
    </View>
  );
};

ClassChangePanel.propTypes = {
  availableClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClassChange: PropTypes.func.isRequired,
};

export default ClassChangePanel;