const MAX_AGE_STR_DIVISOR = 20;
const MAX_AGE_STA_DIVISOR = 7;
const MAX_AGE_INT_DIVISOR = 15;
const MAX_AGE_WIS_DIVISOR = 9;
const MAX_AGE = 40;
 

export const player = {
  name: 'PlayerName',
  age: 8,
  location: 'Forest',
  defaultLocation: 'Forest',
  wealth: 0,
  dp: 0,
  className: 'Peasant',
  attributes: {
    STR: { value: 10, increasedValue: 0 },
    DEX: { value: 10, increasedValue: 0 },
    STA: { value: 10, increasedValue: 0 },
    INT: { value: 10, increasedValue: 0 },
    WIS: { value: 10, increasedValue: 0 },
    CHA: { value: 10, increasedValue: 0 }
  },
  maxAge: MAX_AGE,
  learnedSkills: [],
  purchasedItems: [],
  purchasedLocations: ['Forest']
};

export const calculateMaxAge = (attributes) => {
  let maxAge = MAX_AGE;
  maxAge += Math.floor((attributes.STR.value + attributes.STR.increasedValue) / MAX_AGE_STR_DIVISOR);
  maxAge += Math.floor((attributes.STA.value + attributes.STA.increasedValue) / MAX_AGE_STA_DIVISOR);
  maxAge += Math.floor((attributes.INT.value + attributes.INT.increasedValue) / MAX_AGE_INT_DIVISOR);
  maxAge += Math.floor((attributes.WIS.value + attributes.WIS.increasedValue) / MAX_AGE_WIS_DIVISOR);
  return maxAge;
};
