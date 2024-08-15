import { combineReducers } from 'redux';
// Import your individual reducers here
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  // Add other reducers here
});

export default rootReducer;