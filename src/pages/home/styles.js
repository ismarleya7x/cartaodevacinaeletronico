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
  homeTitle: {
    fontSize: 26,
    marginBottom: 5,
    color: '#fff',
  },
  menuList: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  menuItem: {
    paddingTop: 24,
    paddingHorizontal:15,
    borderRadius: 8,
    backgroundColor: "#ffffdf",
    marginBottom: 16,
    marginRight: 5,
    alignItems: 'center',
    elevation: 8,
  },
  itemTitulo: {
    fontSize: 16,
    color: "#41414d",
    fontWeight: "bold",
    textAlign: 'justify'
  },
  itemImagem:{
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
  newsDetalhes:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
    paddingTop: 20
  },
  textoDetalhe: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemConteudo: {
    paddingTop: 15,
    textAlign: 'justify'
  }
});