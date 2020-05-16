import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, View, Text, Image, Linking, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from 'axios';
import { RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Moment from 'moment';

import styles from './styles';

var cpfField;
var fixoField;
var celularField;

export default function Index({ route }) {
  const params = route.params.status;
  const navigation = useNavigation();
  const [radio, setRadio] = useState('r');
  const [data, setData] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [rg, setRg] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [dependente_de, setDependente] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [celular, setCelular] = useState('');
  const [fixo, setFixo] = useState('');
  const [showEndereco, setShowEndereco] = useState([{
    "bairro": "",
    "cep": "",
    "complemento": "",
    "localidade": "",
    "logradouro": "",
    "uf": "",
  }]);

  useEffect(() => {
    async function setaRadio() {
      if (params) {
        setRadio('d');
      }
    }
    setaRadio()
  }, [])

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

    if (nome == "" || data == "" || email == "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      return
    }

    const body = {
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
      "data_nascimento": Moment(data).format('YYYY-MM-DD'),
      "dependente_de": null,
      "id_tp_usuario": radio == 'r' ? 1 : 2,
      "altura": altura,
      "peso": peso,
      "usuario": usuario,
      "senha": senha,

    }
    if (radio == 'r')
      cadastraUsuario(body)
    if (radio == 'd')
      cadastrarDependente(body)
  }

  async function cadastraUsuario(body) {
    //console.log(body)
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/cadastroUsuario/cadastro', {
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
      "data_nascimento": body.data_nascimento,
      "dependente_de": body.dependente_de,
      "id_tp_usuario": body.id_tp_usuario,
      "altura": body.altura,
      "peso": body.peso,
      "usuario": body.usuario,
      "senha": body.senha
    });

    if (response.data.status_code != 200) {
      Alert.alert("Erro: ", response.data.status_message);
      return
    } else {
      Alert.alert("Sucesso: ", response.data.data.mensagem);
      navigation.navigate('Login');
    }
  }

  function cadastrarDependente(body) {
    //console.log(body)

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
      {
        params != true
          ?
          <View>
            <Text style={styles.cadastroTitulo}>Novo Cadastro</Text>
          </View>
          :
          <View>
            <Text style={styles.cadastroTitulo}>Cadastro de dependente</Text>
          </View>
      }
      <ScrollView style={styles.contentCadastro}>
        <Text style={styles.cadastroTitulo}>Dados pessoais</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          onChangeText={nome => setNome(nome)}
        />
        <TextInputMask
          type={'cpf'}
          style={styles.input}
          keyboardType="numeric"
          placeholder="CPF"
          value={cpf}
          onChangeText={text => setCpf(text)}
          ref={(ref) => cpfField = ref}
        />
        <TextInput
          style={styles.input}
          placeholder="RG"
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
            mask: '(99) 9999-9999',
            getRawValue: function (value, settings) {
              return value.replace(/[^A-Z0-9]+/ig, "");
            }
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
          onChangeText={email => setEmail(email)}
        />

        <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff' }}>
          <Text style={styles.cadastroTitulo}>Tipo de usuário</Text>
          {
            params != true

              ?
              <RadioButton.Group
                onValueChange={(v) => { setRadio(v) }}
              >
                <RadioButton.Item
                  value="r"
                  label="Responsável"
                  status={radio === 'r' ? 'checked' : 'unchecked'}
                  onPress={() => { setRadio('r'); }}
                />
                <RadioButton.Item
                  value="d"
                  label="Dependente"
                  status={radio === 'd' ? 'checked' : 'unchecked'}
                  onPress={() => { setRadio('d') }}
                />
                <RadioButton.Item
                  value="p"
                  label="Prof. Saúde"
                  status={radio === 'p' ? 'checked' : 'unchecked'}
                  onPress={() => { setRadio('p') }}
                />
              </RadioButton.Group>

              : <RadioButton.Group
                onValueChange={(v) => { setRadio(v) }}>
                <RadioButton.Item
                  value="d"
                  label="Dependente"
                  status={'checked'}
                  onPress={() => { setRadio('d') }}
                />
              </RadioButton.Group>
          }
        </View>

        {
          radio == "d"
            ? <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="CPF responsável"
              onChangeText={text => setDependente(text)}
            />
            : radio == "p"
              ? <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Seu COREN"
                onChangeText={() => { }}
              />
              : <View />
        }

        <Text style={styles.cadastroTitulo}>Endereço</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="CEP"
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
              value={showEndereco[0].complemento}
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
        <View><Text style={styles.cadastroTitulo}>Altura e peso</Text>
          <TextInput
            style={styles.input}
            placeholder="Altura em CM"
            onChangeText={text => setAltura(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso em KG"
            onChangeText={text => setPeso(text)}
          />
        </View>
        {
          radio != "d"
            ? <View><Text style={styles.cadastroTitulo}>Credencias</Text>
              <TextInput
                style={styles.input}
                placeholder="Usuário"
                onChangeText={text => setUsuario(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={text => setSenha(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                secureTextEntry={true}
                onChangeText={() => { }}
              />
            </View>
            : <View />
        }
        <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.btnCadastrar} onPress={validaDados}>
            <Text style={styles.cadastrarLabel}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}