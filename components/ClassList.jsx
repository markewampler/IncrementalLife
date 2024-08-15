import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { classes } from '../data/gameData';
import styles from '../utils/styles'; // Import the styles from styles.js

const ClassList = ({ onClassSelect }) => {
  const player = useSelector(state => state.player);

  const availableClasses = classes.filter((classItem) =>
    classItem.locationDependency.length === 0 || classItem.locationDependency.includes(player.location)
  );

  return (
    <View style={styles.classList}>
      {availableClasses.map((classItem) => (
        <TouchableOpacity
          style={[
            styles.classListButton,
            player.className === classItem.name && styles.currentClassButton
          ]}
          key={classItem.name}
          onPress={() => onClassSelect(classItem.name)}
        >
          <Text style={styles.classListButtonText}>{player.className === classItem.name && 'Current Class -'} {classItem.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

ClassList.propTypes = {
  onClassSelect: PropTypes.func.isRequired,
};

export default ClassList;