import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../utils/styles'; // Import the styles from styles.js

const Skill = ({ skill, learnedProgress, onClick, isSelected = false }) => {
  const progress = skill.learningTime > 0 ? (learnedProgress / skill.learningTime) * 100 : 0;

  const effects = Object.entries(skill.effects).map(([attr, amount]) => (
    <Text key={attr} style={styles.skillEffect}>{`${attr}: +${amount}`}</Text>
  ));

  const unmetDependencies = [];
  if (skill.unmetDependencies.attribute) unmetDependencies.push('Attribute');
  if (skill.unmetDependencies.location) unmetDependencies.push('Location');
  if (skill.unmetDependencies.item) unmetDependencies.push('Item');

  return (
    <TouchableOpacity 
      style={[styles.skill, isSelected ? styles.skillSelected : null, !skill.isAvailable ? styles.disabledSkill : null]}
      onPress={() => skill.isAvailable && onClick(skill)}
    >
      <View style={styles.skillInfo}>
        <Text style={styles.skillName}>
          {skill.name}
        </Text>
        {!skill.isAvailable && (
          <Text style={styles.unmetDependencies}>Unmet: {unmetDependencies.join(', ')}</Text>
        )}
        <View style={styles.skillEffects}>{effects}</View>
        <Text style={styles.skillExtra}>{skill.moneyEarned} coins</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]}></View>
      </View>
    </TouchableOpacity>
  );
};

Skill.propTypes = {
  skill: PropTypes.object.isRequired,
  learnedProgress: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Skill;