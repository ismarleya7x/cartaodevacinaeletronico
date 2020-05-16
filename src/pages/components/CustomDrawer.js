import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



//import Home from '../home/index';
import staticProfile from '../../assets/static-profile.png';
//import styles from './styles';

export default function CustomDrawer(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigation = useNavigation();
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [foto, setFoto] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getInformation() {
      const user = await AsyncStorage.getItem('user');
      const userJson = JSON.parse(user);
      const { email, nome_completo, foto } = userJson;
      setNome(nome_completo.split(" ")[0])
      setFoto(foto)
      setEmail(email)
      setUser(user);
    }
    getInformation();
  }, [user]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              {
                !foto
                  ? <Avatar.Image
                    source={staticProfile}
                    size={50}
                  />
                  : <Avatar.Image
                    source={{ uri: foto}}
                    size={50}
                  />
              }

              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{nome}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('Home') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => { props.navigation.navigate('Perfil') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-plus"
                  color={color}
                  size={size}
                />
              )}
              label="Cadastrar dependentes"
              onPress={() => { props.navigation.navigate('Cadastrar Dep.', { status: true }) }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="newspaper"
                  color={color}
                  size={size}
                />
              )}
              label="Cartões de vacina"
              onPress={() => { props.navigation.navigate('Cartao') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="information"
                  color={color}
                  size={size}
                />
              )}
              label="Informações sobre vacinas"
              onPress={() => { Alert.alert("Info", "Opção em desenvolvimento") }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => { props.navigation.navigate('Sair') }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
