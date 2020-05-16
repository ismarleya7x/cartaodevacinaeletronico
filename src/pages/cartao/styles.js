import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#5f8bef',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  viewProfile: {
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editaPerfil: {
    color: '#fff',
    textDecorationLine: 'underline'
  },
  profilePic: {
    width: 110,
    height: 95,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#cdcdcd',
  },
  fundoAjuda: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 0,
    top: -105,
    height: "150%"
  },
  cartaoTitle: {
    fontSize: 26,
    marginBottom: 5,
    color: '#fff',
  },
  menuList: {
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: "nowrap",
    // position: "relative",
    // top: 0,
    marginHorizontal: 15,
    marginTop: 50,
  },
  menuItem: {
    paddingTop: 24,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: "#ffffdf",
    marginBottom: 16,
    width: 160,
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    textAlign: 'center'
  },
  itemImagem: {
    width: 25,
    height: 25,
    marginTop: 8,
  },
  itemStatusProtegido: {
    marginTop: 8,
    color: '#32CD32'
  },
  itemStatusDesprotegido: {
    marginTop: 8,
    color: '#8B0000'
  },
  vacinaDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  },
  textoDetalhe: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold'
  },
  row: {
    flex: 1,
    justifyContent: "space-between"
  },
  viewImage: {
    flex: 1,
    alignItems: 'center'
  },
  btnSelect: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#ffffdf"
  },
  container2: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#5f8bef',
    paddingHorizontal: 15,
  },
  nomeUser: {
    color: "#000",
    textAlign: 'center',
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    margin: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle:{
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: "center"
  },
  modalValue:{
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalFlatList:{
    width: 300,
    paddingBottom: 5,
    paddingLeft: 5
  },
  green:{
    borderLeftColor: 'green',
    borderLeftWidth: 2,
  },
  red:{
    borderLeftColor: 'red',
    borderLeftWidth: 2,
  }
});