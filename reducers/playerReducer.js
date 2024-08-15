const AGE_INCREMENT = 0.0025

const initialState = {
    location: 'Forest',
    purchasedLocations: ['Forest'],
    attributes: {
        STR: { value: 10, increasedValue: 0 },
        DEX: { value: 10, increasedValue: 0 },
        STA: { value: 10, increasedValue: 0 },
        INT: { value: 10, increasedValue: 0 },
        WIS: { value: 10, increasedValue: 0 },
        CHA: { value: 10, increasedValue: 0 }
    },
    learnedSkills: [],
    purchasedItems: [],
    dp: 0,
    age: 8,
    wealth: 0,
    className: 'Peasant',
  };
  
  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_PLAYER_STATE':
            return initialState;
        case 'SET_PLAYER_STATE':
            return { ...state, ...action.payload };
        case 'INCREMENT_AGE':
            return { ...state, age: state.age + AGE_INCREMENT };
        case 'UPDATE_WEALTH':
            return { ...state, wealth: state.wealth + action.payload };
            case 'UPDATE_ATTRIBUTES': {
                const { attribute, amount, type } = action.payload;
                return {
                ...state,
                attributes: {
                    ...state.attributes,
                    [attribute]: {
                    ...state.attributes[attribute],
                    [type]: (state.attributes[attribute][type] || 0) + amount,
                    },
                },
                };
            }

        default:
            return state;
    }
  };
  
  export default playerReducer;