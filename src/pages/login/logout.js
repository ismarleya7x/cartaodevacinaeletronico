import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { useNavigation, BaseRouter } from '@react-navigation/native';

// import { Container } from './styles';

export default function Logout({ route, navigation }) {
  AsyncStorage.clear();
  navigation.navigate('Login')
  return (
   <View />
  );
}
