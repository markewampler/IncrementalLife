import { StyleSheet } from 'react-native';
import colors from './colors'; 

const styles = StyleSheet.create({
  attributeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 5,
    backgroundColor: colors.VeryLightBlue,
    borderRadius: 10,
  },
  attributeCard: {
    flex: 1,
    margin: 5,
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.GrayBackgroundColor,
    transitionProperty: 'transform, color',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },
  attributeCardHighlight: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  dpAttributeContainer: {
    borderWidth: 2,
    borderColor: colors.GrayBackgroundColor,
    borderRadius: 5,
    padding: 10,
  },
  attributeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    padding: 5,
    transitionProperty: 'backgroundColor, boxShadow',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },
  attributeName: {
    width: 50, // Fixed width for attribute name to align buttons
    textAlign: 'center',
  },
  attributeButtons: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    
  },
  attributeButton: {
    backgroundColor: colors.GrayBackgroundColor,
    marginHorizontal: 2,
    padding: 5,
    borderRadius: 5,
  },
  attributeValue: {
    textAlign: 'center',
  },
  attributeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  maxAgeAttributeValue: {
    textAlign: 'center',
    backgroundColor: colors.VeryLightBlue,
    padding: 5,
  },
  highlightedAttributeValue: {
    backgroundColor: colors.AlreadySelectedGreen,
    fontWeight: 'bold',
  },

  playerInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#8993ac',
    borderRadius: 10,
    marginTop: 5,

  },
  maximumAgeText: {
    textAlign: 'right',
  },
  playerInfoBox: {
    flex: 1,
    margin: 2,
    padding: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  infoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  playerInfoCustomButton: {
    backgroundColor: colors.PastelLightBlue, 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5, 
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  playerInfoCustomButtonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 12,
  },

  ageDp: {
    flex: 1,
    textAlign: 'center',
  },
  location: {
    flex: 1,
    textAlign: 'center',
  },
  locationItem: {
    backgroundColor: colors.GrayBackgroundColor,
    marginBottom: 10,
    borderRadius: 5,

  },
  currentLocationButton: {
    backgroundColor: colors.AlreadySelectedGreen,
    cursor: 'not-allowed',
    color: 'black',
  },
  wealth: {
    flex: 1,
    textAlign: 'center',
  },
  safeAreaModalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 10, // Padding from the top of the safe area
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 10, // Ensure there's space between the top of the safe area and the modal
    width: '90%',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
  },

  
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transitionProperty: 'backgroundColor',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },
  modalButtonHover: {
    backgroundColor: '#0056b3',
  },
  modalContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 5,
  },
  purchasedItem: {
    pointerEvents: 'none',
  },
  purchasedItemButton: {
    backgroundColor: colors.VeryLightBlue,
    color: 'black',
    padding: 5,
    borderRadius: 5,
    margin: 3,
  },
  itemsContainer: {
    borderWidth: 2,
    borderColor: colors.GrayBackgroundColor,
    padding: 5,
  },
  purchaseButton: {
    borderRadius: 5,
    backgroundColor: colors.GrayBackgroundColor,
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 3,
  },
  currentRoundPurchasedButton: {
    borderRadius: 5,
    backgroundColor: colors.AlreadySelectedGreen,
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 3,
  },
  locationsContainer: {
    borderWidth: 2,
    borderColor: colors.GrayBackgroundColor,
    padding: 5,
  },
  warningText: {
    color: 'rgb(197, 108, 0)',
  },
  successText: {
    color: 'green',
  },
  skill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5,
    backgroundColor: '#c6cedd',
    borderRadius: 10,
    color: 'black',
    cursor: 'pointer',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    transitionProperty: 'borderColor',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },
  skillSelected: {
    backgroundColor: colors.AlreadySelectedGreen,
  },
  progressBar: {
    width: '100%',
    backgroundColor: colors.GrayBackgroundColor,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
    transitionProperty: 'backgroundColor',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease',
  },
  progress: {
    height: 10,
    backgroundColor: '#4caf50',
    transitionProperty: 'width',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease',
  },
  skillInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  skillName: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  skillEffects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  skillEffect: {
    paddingHorizontal: 5,
  },
  skillExtra: {
    flex: 1,
    textAlign: 'right',
  },
  unmetDependencies: {
    color: 'red',
    marginLeft: 10,
  },
  disabledSkill: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // or whatever your background color is
  },
  SettingsTouchableButtonYes: {
    flex:1,
    backgroundColor: colors.AlreadySelectedGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  SettingsTouchableButtonTextYes: {
    color: 'black',
    fontSize: 16,
  },
  SettingsTouchableButtonNo: {
    flex:1,
    backgroundColor: '#fa6666',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  SettingsTouchableButtonTextNo: {
    color: 'black',
    fontSize: 16,
  },
  SettingsTouchableButtonHardReset: {
    backgroundColor: colors.PastelDeepBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  SettingsTouchableButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  SettingsTouchableButtonText: {
    color: 'white',
    fontSize: 16,
  },
  settingsModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  classListButton: {
    backgroundColor: colors.GrayBackgroundColor,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  classListButtonText: {
    color: 'black',
    fontSize: 16,
  },
  currentClassButton: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.AlreadySelectedGreen,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  tabButton: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.GrayBackgroundColor,
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    backgroundColor: colors.AlreadySelectedGreen,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  MaxAgemodalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultButton: {
    backgroundColor: colors.PastelLightBlue,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  setDefaultButton: {
    backgroundColor: colors.AlreadySelectedGreen,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedDefaultButton: {
    backgroundColor: colors.AlreadySelectedGreen,
    opacity: 0.5,
    pointerEvents: 'none',
  },
  maxAgeLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledButton: {
    opacity: 0.5,
    pointerEvents: 'none',
  },

});


export default styles;