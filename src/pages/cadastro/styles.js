import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#5f8bef',
  },  
  cadastroTitulo:{
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 24
  },
  contentCadastro:{
    flex: 1,
    margin:15
  },
  input:{
    width: '100%',
    height: 55,
    borderBottomWidth: 1,
    borderColor: '#fff',
    padding: 0,
    color: '#fff',
    textAlign: 'left',
  },
  label: {
    paddingTop: 15,
    color: "#fff"
  },
  viewEndereco: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  radioOption:{
    color: '#fff',
  },
  btnCadastrar: {
    width: '50%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  cadastrarLabel:{
    textAlign: 'center',
    color: '#5f8bef'
  },
  viewBottom:{
    alignItems: 'center'
  }
})