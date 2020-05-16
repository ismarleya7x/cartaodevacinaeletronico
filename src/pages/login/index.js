import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import api from 'axios';

import styles from './styles';
import logo from '../../assets/logo.png';


export default function Index() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");


  function verificaCampos() {
    if (usuario == "" && senha == "") {
      Alert.alert("Erro", "Informe seu usuário e senha!");
      return
    }
    if (usuario == "") {
      Alert.alert("Erro", "Informe seu usuário!");
      return
    }
    if (senha == "") {
      Alert.alert("Erro", "Informe sua senha!");
      return
    }

    navigateToHome()
  }

  async function navigateToHome() {
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/usuario/Login', {
      "usuario": usuario,
      "senha": senha
    });
    //console.log(response.data);
    if (response.data.status_code != 200) {
      Alert.alert(String(response.data.status_code), "Erro: " + response.data.status_message);
      return
    }
    AsyncStorage.setItem('user', JSON.stringify(response.data.data[0]))
    navigation.navigate('App', { screen: 'Home', params: { user: response.data.data[0] } });
  }

  function navigateToCadastro() {
    navigation.navigate('Cadastro');
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(12,186,94,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 750,
        }}
      />
      <View style={styles.viewLogin}>
        <Image source={logo} style={styles.loginLogo} />
        <Text style={styles.nomeApp}>
          Cartão de Vacina Eletrônico!
        </Text>
        <Text style={styles.labels}>
          Usuário:
        </Text>
        <TextInput
          style={styles.inputUser}
          autoCapitalize={'none'}
          placeholder="Meu usuário"
          onChangeText={usuario => setUsuario(usuario)}
        />
        <Text style={styles.labels}>
          Senha:
        </Text>
        <TextInput
          style={styles.inputUser}
          placeholder="**********"
          secureTextEntry={true}
          onChangeText={senha => setSenha(senha)}
        />
        <View style={styles.viewLinks}>
          <TouchableOpacity onPress={() => Alert.alert('Informação', 'Opção em DEV')} style={styles.links}>
            <Text style={styles.labels}>Recuperar Senha</Text>
          </TouchableOpacity>
          <Text style={styles.labels}> | </Text>
          <TouchableOpacity onPress={navigateToCadastro} style={styles.links}>
            <Text style={styles.labels}>Novo Cadastro</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={verificaCampos} style={styles.btnEntrar}>
          <Text style={styles.entrarLabel}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
