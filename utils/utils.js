import { classes, skills as allSkills } from '../data/gameData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYER_STATE_KEY = 'PLAYER_STATE';
const LEARNING_CAP_PERCENTAGE = 0.01;
const DIVINE_POINT_DIVISOR = 10;
const LEARNING_SPEED_DIVISOR = 100;
const DIVINE_POINT_MULTIPLIER = 1;

export function getAttributes(player) {
  if (!player?.attributes) return [];

  return Object.keys(player.attributes).map(key => ({
    name: key, // Use the key as the name
    value: player.attributes[key]?.value ?? 0
  }));
}

export function increaseAttribute(player, name, amount) {
  if (!player?.attributes) return;

  if (player.attributes[name]) {
    player.attributes[name].value += amount;
  }
}

export const calculateLearningSpeed = (playerState, skill) => {
  const baseLearningSpeed = calculateBaseLearningSpeed(playerState, skill);
  const cap = skill.learningTime * LEARNING_CAP_PERCENTAGE;
  return Math.min(baseLearningSpeed, cap);
};

export function calculateBaseLearningSpeed(player, skill) {
  if (!player?.attributes || !skill?.multipliers) return 1;

  let speed = 1;
  for (const [attr, multiplier] of Object.entries(skill.multipliers)) {
    const attribute = player.attributes[attr];
    if (attribute) {
      speed += (attribute.value + (attribute.increasedValue || 0)) * multiplier / LEARNING_SPEED_DIVISOR;
    }
  }
  return speed;
}

export function filterSkillsByClassAndAttributes(player) {
  // Ensure purchasedItems is defined
  const purchasedItems = player.purchasedItems || [];

  return allSkills
    .filter(skill => skill.classDependency.includes(player.className))
    .map(skill => {
      const meetsAttributeDependency = Object.entries(skill.attributeDependency).every(
        ([attr, value]) => (player.attributes[attr].value + player.attributes[attr].increasedValue) >= value
      );
      const meetsLocationDependency = skill.locationDependency.length === 0 || skill.locationDependency.includes(player.location);
      const meetsItemDependency = !skill.itemDependency || purchasedItems.some(item => item.name === skill.itemDependency && (item.coinPurchased || item.divinePointPurchase));

      return {
        ...skill,
        isAvailable: meetsAttributeDependency && meetsLocationDependency && meetsItemDependency,
        unmetDependencies: {
          attribute: !meetsAttributeDependency,
          location: !meetsLocationDependency,
          item: !meetsItemDependency,
        }
      };
    });
}

export function filterClassesByLocationAndAttributes(player) {
  const purchasedItems = player.purchasedItems || [];

  return classes.filter(cls => {
    const meetsLocationDependency = cls.locationDependency.length === 0 || cls.locationDependency.includes(player.location);

    const meetsAttributeDependency = cls.attributeDependencies
      ? cls.attributeDependencies.every(dep =>
          (player.attributes[dep.attribute]?.value + player.attributes[dep.attribute]?.increasedValue) >= dep.value
        )
      : true;

    return meetsLocationDependency && meetsAttributeDependency;
  });
}

export function canClassBeSelected(player, selectedClass) {
  const purchasedItems = player.purchasedItems || [];
  const classData = classes.find(c => c.name === selectedClass);

  if (!classData) return false;

  const meetsLocationDependency = classData.locationDependency.length === 0 || classData.locationDependency.includes(player.location);
  const meetsAttributeDependency = classData.attributeDependencies.every(dep =>
    (player.attributes[dep.attribute]?.value + player.attributes[dep.attribute]?.increasedValue) >= dep.value
  );

  return meetsLocationDependency && meetsAttributeDependency;
}

export const addWealth = (currentWealth, earnedAmount) => {
  return currentWealth + earnedAmount;
};

export const deductWealth = (currentWealth, deductionAmount) => {
  return currentWealth - deductionAmount;
};

export const calculateDivinePoints = (attributes) => {
  let points = 0;
  for (const key in attributes) {
    if (attributes[key]?.increasedValue) {
      points += attributes[key].increasedValue;
    }
  }
  points = Math.floor((points / DIVINE_POINT_DIVISOR) * DIVINE_POINT_MULTIPLIER);
  return points > 0 ? points : 0;
};

// Use AsyncStorage for saving and loading player state in React Native
export const loadPlayerState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PLAYER_STATE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load player state', e);
    return null;
  }
};

export const savePlayerState = async (playerState) => {
  try {
    const jsonValue = JSON.stringify(playerState);
    await AsyncStorage.setItem(PLAYER_STATE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save player state', e);
  }
};