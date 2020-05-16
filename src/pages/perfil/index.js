import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text';
import api from 'axios';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

import styles from './styles';
import staticProfile from '../../assets/static-profile.png';

var cpfField;
var fixoField;
var celularField;

export default function Index() {
  const [foto, setFoto] = useState(null);
  const [usuario, setUsuario] = useState({});
  const [usuar, setUsuar] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [fixo, setFixo] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [idDadosUsuario, setIdDadosUsuario] = useState(0);
  const [showEndereco, setShowEndereco] = useState([{
    "bairro": "",
    "cep": "",
    "complemento": "",
    "localidade": "",
    "logradouro": "",
    "uf": "MG",
  }]);

  useEffect(() => {
    async function getInformation() {
      const user = await AsyncStorage.getItem('user');
      const userJson = JSON.parse(user);

      //console.log(userJson)

      const enderecoJson = [{
        "bairro": userJson.bairro,
        "cep": userJson.cep,
        "complemento": userJson.complemento,
        "localidade": userJson.cidade,
        "logradouro": userJson.logradouro,
        "uf": userJson.uf,
      }]

      setNumero(userJson.numero)
      setIdDadosUsuario(userJson.id_dados_usuario)
      setNome(userJson.nome_completo)
      setRg(userJson.rg)
      setEmail(userJson.email)
      setUsuario(userJson)
      setUsuar(userJson.usuario)
      setCpf(userJson.cpf)
      setFixo(userJson.telefone_fixo)
      setSenha(userJson.senha)
      setFoto(userJson.foto)
      setData(userJson.data_nascimento)
      setCelular(userJson.telefone_celular)
      setShowEndereco(enderecoJson)
      setData(Moment(userJson.data_nascimento).format("DD-MM-YYYY"))
    }
    getInformation();
  }, []);


  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão para acessar seus arquivos!');
      }
    }
  };

  async function _pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setFoto(result.uri);
      }

      //console.log(result);
    } catch (E) {
      //console.log(E);
    }
  };


  function buscaCep(x) {
    if (x.length == 8) {
      getEndereco(x)
    } else {
      Alert.alert("CEP incorreto", "O CEP deve possuir 8 caracteres!");
    }
  }

  async function getEndereco(x) {
    const [endereco, ...rest] = showEndereco
    const retorno = await api.get('https://viacep.com.br/ws/' + x + '/json/');

    rest.push(retorno.data)
    setShowEndereco(rest)
  }

  function validaDados() {
    if (nome == "" || cpf == "" || rg == "" || data == "" || email == "" || senha == "" || numero == "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      return
    }

    const body = {
      "id_dados_usuario" : idDadosUsuario,
      "nome_completo": nome,
      "cpf": cpfField.getRawValue(),
      "rg": rg,
      "telefone_fixo": fixoField.getRawValue(),
      "telefone_celular": celularField.getRawValue(),
      "email": email,
      "logradouro": showEndereco[0].logradouro,
      "numero": numero,
      "complemento": complemento,
      "bairro": showEndereco[0].bairro,
      "cep": showEndereco[0].cep.replace("-", ""),
      "cidade": showEndereco[0].localidade,
      "uf": showEndereco[0].uf,
      "data_nascimento":data,
      "senha": senha,

    }
    atualizaUsuario(body)
  }

  async function atualizaUsuario(body) {
    const novaData = data.split("-");
    //console.log(novaData);
    const dataToSend = novaData[2] + "-" + novaData[1] + "-" + novaData[0]
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/atualizaCadastro/atualiza', {
      "nome_completo": body.nome_completo,
      "cpf": body.cpf,
      "rg": body.rg,
      "telefone_fixo": body.telefone_fixo,
      "telefone_celular": body.telefone_celular,
      "email": body.email,
      "logradouro": body.logradouro,
      "numero": body.numero,
      "complemento": body.complemento,
      "bairro": body.bairro,
      "cep": body.cep,
      "cidade": body.cidade,
      "uf": body.uf,
      "data_nascimento": dataToSend,
      "senha": body.senha,
      "id_usuario": body.id_dados_usuario
    });

    if (response.data.status_code != 200) {
      //console.log(response.data)
      Alert.alert("Erro: ", response.data.status_message);
      return
    }else{
      Alert.alert("Sucesso: ", response.data.data.mensagem);

      navigation.navigate('App', { screen: 'Home', params: { user: response.data.data.body } })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <View>
        <Text style={styles.cadastroTitulo}>Editar Cadastro</Text>
      </View>
      <ScrollView style={styles.contentCadastro}>
        <View style={styles.viewProfile}>
          <TouchableOpacity onPress={_pickImage}>
            {
              !foto

                ? <Image source={staticProfile} style={styles.profilePic} />

                : <Image source={{ uri: foto }} style={styles.profilePic} />
            }
          </TouchableOpacity>
        </View>
        <Text style={styles.cadastroTitulo}>Dados pessoais</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          onChangeText={nome => setNome(nome)}
          defaultValue={usuario.nome_completo}
        />
        <TextInputMask
          type={'cpf'}
          style={styles.input}
          keyboardType="numeric"
          placeholder="CPF"
          value={cpf}
          ref={(ref) => cpfField = ref}
          onChangeText={text => setCpf(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="RG"
          defaultValue={usuario.rg}
          onChangeText={rg => setRg(rg)}
        />
        <TextInputMask
          style={styles.input}
          type={'datetime'}
          value={data}
          options={{
            format: 'DD/MM/YYYY'
          }}
          placeholder="Data de nascimento"
          onChangeText={text => setData(text)}
        />
        <TextInputMask
          type={'custom'}
          options={{
            mask: '(99) 9999-9999'
          }}
          value={fixo}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Telefone Fixo + DDD"
          onChangeText={text => setFixo(text)}
          ref={(ref) => fixoField = ref}
        />
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={celular}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Celular + DDD"
          onChangeText={text => setCelular(text)}
          ref={(ref) => celularField = ref}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          defaultValue={usuario.email}
          onChangeText={email => setEmail(email)}
        />

        <Text style={styles.cadastroTitulo}>Endereço</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="CEP"
          defaultValue={showEndereco[0].cep}
          onEndEditing={(e) => buscaCep(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Logradouro"
          onChangeText={() => { }}
          editable={false}
          value={showEndereco[0].logradouro}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          defaultValue={numero}
          onChangeText={text => setNumero(text)}
        />
        {
          showEndereco[0].complemento == ""

            ? <TextInput
              style={styles.input}
              placeholder="Complemento"
              onChangeText={text => setComplemento(text)}
            />
            : <TextInput
              style={styles.input}
              placeholder="Complemento"
              onChangeText={text => setComplemento(text)}
              defaultValue={showEndereco[0].complemento}
            />
        }

        <TextInput
          style={styles.input}
          placeholder="Bairro"
          editable={false}
          onChangeText={() => { }}
          value={showEndereco[0].bairro}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          editable={false}
          onChangeText={() => { }}
          value={showEndereco[0].localidade}
        />
        <TextInput
          style={styles.input}
          placeholder="UF"
          editable={false}
          onChangeText={() => { }}
          value={showEndereco[0].uf}
        />

        <View>
          <Text style={styles.cadastroTitulo}>Credencias</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            onChangeText={() => { }}
            editable={false}
            defaultValue={usuario.usuario}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={text => setSenha(text)}
            defaultValue={usuario.senha}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <View style={styles.viewBottom}>
            <TouchableOpacity style={styles.btnCadastrar} onPress={() => validaDados()}>
              <Text style={styles.cadastrarLabel}>Salvar Cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
