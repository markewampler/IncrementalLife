import { StyleSheet } from 'react-native';
import colors from './colors'; 

const styles = StyleSheet.create({
  attributeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 5,
    backgroundColor: '#c6cedd',
    borderRadius: 10,
    // marginTop: 20,
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
    borderColor: 'black',
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
    textAlign: 'center',
  },
  attributeButtons: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  attributeValue: {
    textAlign: 'center',

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
    backgroundColor: 'lightgreen',
    cursor: 'not-allowed',
    color: 'black',
  },
  wealth: {
    flex: 1,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxWidth: 900,
    width: '80%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
    gap: 20,
    padding: 10,
  },
  purchasedItem: {
    pointerEvents: 'none',
  },
  purchasedItemButton: {
    cursor: 'not-allowed',
    backgroundColor: 'lightgreen',
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
  itemsContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 5,
  },
  locationsContainer: {
    borderWidth: 2,
    borderColor: 'silver',
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
  SettingsTouchableButton: {
    backgroundColor: colors.PastelDeepBlue,
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
    backgroundColor: colors.PastelDeepBlue,
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
  }

});


export default styles;