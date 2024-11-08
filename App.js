// App.js
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AttributeCard from './components/AttributeCard';
import PlayerInfo from './components/playerInfo';
import SkillList from './components/SkillList';
import LocationChangeModal from './components/LocationChangeModal';
import PurchaseItemsModal from './components/PurchaseItemsModal';
import ClassChangeModal from './components/ClassChangeModal';
import MaxAgeModal from './components/MaxAgeModal';
import styles from './utils/styles';
import {
  calculateLearningSpeed,
  filterSkillsByClassAndAttributes,
  filterClassesByLocationAndAttributes,
  addWealth,
  calculateDivinePoints
} from './utils/utils';
import {calculateMaxAge} from './data/playerData'
import { items, locations } from './data/gameData';
// import { SafeAreaView } from 'react-native-safe-area-context';

const TIME_INCREMENT = 140

const AppContent = () => {
  const playerState = useSelector(state => state.player);
  const dispatch = useDispatch();
  // console.log(playerState)
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [highlightedAttributes, setHighlightedAttributes] = useState([]);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isClassChangeModalOpen, setIsClassChangeModalOpen] = useState(false);
  const [isMaxAgeModalOpen, setIsMaxAgeModalOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  useEffect(() => {
    const newMaxAge = calculateMaxAge(playerState.attributes);
    dispatch({ type: 'SET_PLAYER_STATE', payload: { maxAge: newMaxAge } });
  }, [playerState.attributes]);

  useEffect(() => {
    if (gameStarted && playerState.age >= playerState.maxAge) {
      const earnedDP = calculateDivinePoints(playerState.attributes);
      dispatch({ type: 'SET_PLAYER_STATE', payload: { dp: earnedDP } });
      setIsMaxAgeModalOpen(true);
      setGamePaused(true);
    }
  }, [playerState.age, playerState.maxAge, gameStarted]);

  useEffect(() => {
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (!selectedSkill || gamePaused) {
      return;
    }
  
    const intervalId = setInterval(() => {
      dispatch({ type: 'INCREMENT_AGE' });
  
      const learningSpeed = calculateLearningSpeed(playerState, selectedSkill);
      const existingSkill = playerState.learnedSkills.find(skill => skill.id === selectedSkill.id);
      const updatedSkill = {
        id: selectedSkill.id,
        learned: Math.min((existingSkill?.learned || 0) + learningSpeed, selectedSkill.learningTime),
      };
  
      let updatedLearnedSkills = playerState.learnedSkills.map(skill =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      );
  
      if (!existingSkill) {
        updatedLearnedSkills.push(updatedSkill);
      }
  
      if (updatedSkill.learned >= selectedSkill.learningTime) {
        Object.entries(selectedSkill.effects).forEach(([attr, amount]) => {
          dispatch({ type: 'UPDATE_ATTRIBUTES', payload: { attribute: attr, amount, type: 'increasedValue' } });
        });
  
        setHighlightedAttributes(Object.keys(selectedSkill.effects));
  
        const updatedWealth = addWealth(playerState.wealth, parseInt(selectedSkill.moneyEarned));
        const earnedDP = calculateDivinePoints(playerState.attributes);
  
        // if (earnedDP > playerState.dp) {
        //   setHighlightedDivinePoints(true);
        // }

        // Reset the learned value for the skill
        const resetSkill = { ...updatedSkill, learned: 0 };
        updatedLearnedSkills = updatedLearnedSkills.map(skill =>
          skill.id === resetSkill.id ? resetSkill : skill
        );
  
        dispatch({ type: 'SET_PLAYER_STATE', payload: { learnedSkills: updatedLearnedSkills, wealth: updatedWealth, dp: earnedDP } });
  
        setTimeout(() => {
          // setHighlightedDivinePoints(false);
          setHighlightedAttributes([]);
        }, 3000);
      } else {
        dispatch({ type: 'SET_PLAYER_STATE', payload: { learnedSkills: updatedLearnedSkills } });
      }
    }, TIME_INCREMENT);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedSkill, gamePaused, dispatch, playerState]);

  if (!playerState || !playerState.attributes) {
    return (
      <View style={styles.appContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const derivedAttributes = Object.keys(playerState.attributes).reduce((acc, key) => {
    acc[key] = playerState.attributes[key].value + (playerState.attributes[key].increasedValue || 0);
    return acc;
  }, {});

  const handleSoftReset = (newInitialAttributes, updatedItems, updatedLocations, selectedLocation) => {
    const newAttributes = { ...playerState.attributes };

    Object.entries(newInitialAttributes).forEach(([key, value]) => {
      newAttributes[key] = {
        value: value.value,
        increasedValue: 0,
      };
    });

    const purchasedItems = updatedItems
      ? updatedItems.filter(item => item.divinePointPurchase).map(item => ({ ...item, coinPurchased: false }))
      : [];

    const purchasedLocations = updatedLocations.length
      ? updatedLocations.map(locationKey => locationKey)
      : playerState.purchasedLocations;

    const newState = {
      ...playerState,
      attributes: newAttributes,
      age: 8,
      wealth: 0,
      dp: 0,
      className: 'Peasant',
      purchasedItems: purchasedItems,
      location: selectedLocation || 'Forest',
      defaultLocation: selectedLocation || 'Forest',
      learnedSkills: [],
      purchasedLocations: purchasedLocations,
    };

    dispatch({ type: 'SET_PLAYER_STATE', payload: newState });
    setSelectedSkill(null);
    setGamePaused(false);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
  };

  const handleClassChange = (newClassName) => {
    dispatch({ type: 'SET_PLAYER_STATE', payload: { className: newClassName } });
    setSelectedSkill(null);
  };

  const handleLocationChange = (newLocation, updatedWealth) => {
    dispatch({ type: 'SET_PLAYER_STATE', payload: { location: newLocation, wealth: updatedWealth } });
    setAvailableClasses(filterClassesByLocationAndAttributes({ ...playerState, location: newLocation }));
    setSelectedSkill(null);
  };

  const handlePurchaseItem = (itemCost, itemName) => {
    const existingItem = playerState.purchasedItems.find(item => item.name === itemName);

    let updatedItems;
    if (existingItem) {
      updatedItems = playerState.purchasedItems.map(item =>
        item.name === itemName ? { ...item, coinPurchased: true } : item
      );
    } else {
      updatedItems = [
        ...playerState.purchasedItems,
        { name: itemName, coinPurchased: true, divinePointPurchase: false },
      ];
    }

    dispatch({ type: 'SET_PLAYER_STATE', payload: { wealth: playerState.wealth - itemCost, purchasedItems: updatedItems } });
  };

  const filteredSkills = filterSkillsByClassAndAttributes(playerState);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const openPurchaseModal = () => setIsPurchaseModalOpen(true);
  const closePurchaseModal = () => setIsPurchaseModalOpen(false);

  const openClassChangeModal = () => setIsClassChangeModalOpen(true);
  const closeClassChangeModal = () => setIsClassChangeModalOpen(false);

  return (

      <ScrollView style={styles.appContainer}>
        <View style={styles.attributeContainer}>
          {Object.keys(derivedAttributes).map((key, index) => (
            <AttributeCard
              key={index}
              name={key}
              value={derivedAttributes[key]}
              highlighted={highlightedAttributes.includes(key)}
            />
          ))}
        </View>
        <PlayerInfo
          player={playerState}
          onOpenLocationModal={openLocationModal}
          onOpenPurchaseModal={openPurchaseModal}
          onOpenClassChangeModal={openClassChangeModal}
        />
        <SkillList
          skills={filteredSkills.map(skill => ({
            ...skill,
            learnedProgress: playerState.learnedSkills.find(s => s.id === skill.id)?.learned || 0
          }))}
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
        />
        {isLocationModalOpen && (
          <LocationChangeModal
            isOpen={isLocationModalOpen}
            player={playerState}
            locations={locations}
            currentLocation={playerState.location}
            onLocationChange={handleLocationChange}
            onClose={closeLocationModal}
          />
        )}
        {isPurchaseModalOpen && (
          <PurchaseItemsModal
            isOpen={isPurchaseModalOpen}
            onClose={closePurchaseModal}
            onPurchaseItem={handlePurchaseItem}
            items={items}
            playerItems={playerState.purchasedItems}
            wealth={playerState.wealth}
            playerLocation={playerState.location}
          />
        )}
        {isClassChangeModalOpen && (
          <ClassChangeModal
            isOpen={isClassChangeModalOpen}
            player={playerState}
            onClassChange={handleClassChange}
            onClose={closeClassChangeModal}
          />
        )}
        {isMaxAgeModalOpen && (
          <MaxAgeModal
            isOpen={isMaxAgeModalOpen}
            onClose={() => setIsMaxAgeModalOpen(false)}
            onSoftReset={handleSoftReset}
            attributes={playerState.attributes}
            divinePoints={playerState.dp}
            items={playerState.purchasedItems}
            locations={locations}
            defaultLocation={playerState.defaultLocation}
            playerItems={playerState.purchasedItems}
            player={playerState}
          />
        )}
      </ScrollView>

  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView style={styles.safeArea}>
        <AppContent />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);


export default App;