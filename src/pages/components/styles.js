import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  viewProfile: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15
  },
  viewItemMenu:{
    flex: 1,
    paddingVertical: 2,
    marginHorizontal: 15
  },
  btnMenu:{
    flexDirection: 'row',
    paddingVertical: 10,
  },
  menuItem:{
    color: "#696969"
  },
  menuIcon:{
    paddingRight: 5
  },
  profilePic:{
    width: 55,
    height: 55,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#cdcdcd',
  },
  editaPerfil: {
    color: '#000',
    textDecorationLine: 'underline'
  }
})