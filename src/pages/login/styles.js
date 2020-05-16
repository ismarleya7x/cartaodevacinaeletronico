import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#5f8bef',
  },
  viewLogin: {
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginLogo: {
    width: 150,
    height: 150
  },
  nomeApp:{
    fontSize: 24,
    color: '#fff',
    marginTop: 15,
  },
  inputUser:{
    marginTop: 15,
    width: '85%',
    height: 55,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#fff',
    padding: 15,
    color: '#fff',
    textAlign: 'center'
  },
  labels: {
    marginTop: 15,
    color: "#fff"
  }, 
  viewLinks:{
    flexDirection: 'row'
  },
  btnEntrar: {
    width: '50%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  entrarLabel:{
    textAlign: 'center',
    color: '#5f8bef'
  }
})