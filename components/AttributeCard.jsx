import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../utils/styles'; // Import the styles from styles.js

const AttributeCard = ({ name, value, highlighted }) => {
  return (
    <View style={[styles.attributeCard, highlighted ? styles.attributeCardHighlight : null]}>
      <Text style={styles.attributeValue}>{value.toFixed(1)}</Text>
      <Text style={styles.attributeName}>{name}</Text>
    </View>
  );
};

AttributeCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  highlighted: PropTypes.bool,
};

export default AttributeCard;