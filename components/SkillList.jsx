// SkillList.js
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Skill from './Skill';
import styles from '../utils/styles'; // Import the styles from styles.js

const SkillList = ({ skills, selectedSkill, onSelectSkill }) => {
  // Sort skills to have available ones first
  const sortedSkills = skills.sort((a, b) => {
    if (a.isAvailable && !b.isAvailable) return -1;
    if (!a.isAvailable && b.isAvailable) return 1;
    return 0;
  });

  return (
    <ScrollView style={styles.skillList}>
      {sortedSkills.map(skill => (
        <Skill
          key={skill.id}
          skill={skill}
          learnedProgress={skill.learnedProgress || 0}
          onClick={onSelectSkill}
          isSelected={selectedSkill && selectedSkill.id === skill.id}
        />
      ))}
    </ScrollView>
  );
};

SkillList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSkill: PropTypes.object,
  onSelectSkill: PropTypes.func.isRequired,
};

export default SkillList;