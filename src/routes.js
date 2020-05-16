import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, D } from '@react-navigation/drawer';

import Login from './pages/login/index';
import Home from './pages/home/index';
import Perfil from './pages/perfil/index';
import Cadastro from './pages/cadastro/index';
import Cartao from './pages/cartao/index';
import Sair from './pages/login/logout';

import CustomDrawer from './pages/components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} initialParams={{ status: false }} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

function App() {
  
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cadastrar Dep." component={Cadastro} />
      <Drawer.Screen name="Cartao" component={Cartao} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Sair" component={Sair} />
    </Drawer.Navigator>
  );
}
