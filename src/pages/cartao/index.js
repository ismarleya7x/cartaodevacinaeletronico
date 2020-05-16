import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, FlatList, Text, Image, AsyncStorage, TouchableOpacity, Modal, Alert } from 'react-native';
import api from 'axios';
import Moment from 'moment';

import fundoHelper from '../../assets/fundo-helper.png';
import staticProfile from '../../assets/static-profile.png';
import protegido from '../../assets/protegido.png';
import desprotegido from '../../assets/desprotegido.png';
import styles from './styles';

export default function Index({ route, navigation }) {
  const [nome, setNome] = useState(null);
  const [id_usuario, setIdUsuario] = useState(null);
  const [foto, setFoto] = useState(null);
  const [dadosVacina, setDadosVacina] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dadosDaVacina, setDadosDaVacina] = useState(["validar"]);

  useEffect(() => {
    async function getInformation() {
      const user = await AsyncStorage.getItem('user');
      const userJson = JSON.parse(user);
      const { id_dados_usuario, nome_completo, foto } = userJson;
      setNome(nome_completo.split(" ")[0])
      setFoto(foto)
      setIdUsuario(id_dados_usuario)

    }
    getInformation();
  }, []);

  useEffect(() => { id_usuario != null ? buscaVacinas() : "" }, [id_usuario]);

  async function buscaVacinas() {
    console.log(id_usuario)
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/vacinas/getUserVacinas', {
      "id_usuario": id_usuario
    });

    if (response.data.status_code != 200) {
      console.log(response.data);
      getAllVacinas()
    } else {
      console.log(response.data);
      setDadosVacina([]);
      setDadosVacina(response.data.data);

    }
  }

  async function getAllVacinas() {
    const response = await api.get('https://piunacartaodevacina.000webhostapp.com/vacinas/getAllVacinas');

    if (response.data.status_code != 200) {
      Alert.alert("Erro", "Houve algum erro ao buscas as vacinas!");
    } else {
      setDadosVacina(response.data.data);
    }
  }

  async function getItemData(item) {
    //console.log(item)

    await setDadosDaVacina(item);
    setModalVisible(!modalVisible)
    console.log("item")
    console.log(item)
    console.log("dadosDaVacina")
    console.log(dadosDaVacina)
  }

  async function validarVacina(id_vacina, id_usuario) {
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/vacinas/validarVacina', {
      "id_usuario": id_usuario,
      "id_vacina": id_vacina
    });
    console.log(id_usuario)
    console.log(id_vacina)

    if (response.data.status_code != 200) {
      console.log(response.data.status_message)
      setModalVisible(!modalVisible)
    } else {
      Alert.alert("Sucesso", response.data.data.mensagem)
      setModalVisible(!modalVisible)
      buscaVacinas()
    }
  }

  async function insereVacina(id_vacina, id_usuario) {
    const response = await api.post('https://piunacartaodevacina.000webhostapp.com/vacinas/insertNewVacina', {
      "id_usuario": id_usuario,
      "id_vacina": id_vacina
    });

    if (response.data.status_code != 200) {
      Alert.alert("Info", response.data.status_message)
    } else {
      Alert.alert("Sucesso", response.data.data.mensagem)
      setModalVisible(!modalVisible)
      buscaVacinas()
    }
  }

  const numColumns = 2;

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
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Cartão de Vacina Eletrônico!
        </Text>
      </View>
      <View style={styles.viewProfile}>
        {
          !foto

            ? <Image source={staticProfile} style={styles.profilePic} />

            : <Image source={{ uri: foto }} style={styles.profilePic} />
        }
        <TouchableOpacity onPres={() => { }}>
          <Text style={styles.editaPerfil}>Editar perfil</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Seja bem vindo, {nome}!</Text>
        <Text style={styles.cartaoTitle}>Meu cartão de vacina</Text>
      </View>



      <FlatList
        style={styles.menuList}
        data={dadosVacina}
        keyExtractor={item => String(item.id_vacina)}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemValue}>{item.nome_vacina}</Text>
            {item.status == true
              ? <View style={styles.viewImage}>
                <Image source={protegido} style={styles.itemImagem} />
                <Text style={styles.itemStatusProtegido}>Você está protegido!</Text>
              </View>
              : <View style={styles.viewImage}>
                <Image source={desprotegido} style={styles.itemImagem} />
                <Text style={styles.itemStatusDesprotegido}>Você está desprotegido!</Text>
              </View>
            }
            <TouchableOpacity
              style={styles.vacinaDetalhes}
              onPress={() => { getItemData(item) }}
            >
              <Text style={styles.textoDetalhe}>Mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{dadosDaVacina.nome_vacina}</Text>
            <FlatList
              data={dadosDaVacina.dados}
              keyExtractor={item => String(item.tomada_em)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  {
                    item.tomada_em != null
                      ? <View style={[styles.modalFlatList, styles.green]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.modalValue}>Dose tomada em: </Text>
                          <Text>{Moment(item.tomada_em).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.modalValue}>Lote: </Text>
                          <Text>A implementar</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.modalValue}>Local: </Text>
                          <Text>A implementar</Text>
                        </View>
                      </View>

                      : <View style={[styles.modalFlatList, styles.red]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.modalValue}>Tomar em: </Text>
                          <Text>{
                            item.tomar_em != null
                              ? Moment(item.tomar_em).format('DD/MM/YYYY')
                              : "Sem dados iniciais"
                          }</Text>
                        </View>
                        <View>
                          <Text style={{ color: 'red' }}>Você ainda não tomou esta dose!</Text>
                          <Text style={{ color: 'red' }}>Clique em validar para registrar!</Text>
                        </View>
                      </View>
                  }
                </View>
              )}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => { setModalVisible(!modalVisible) }}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </TouchableOpacity>
              {
                dadosDaVacina[0] != "validar"
                  ? dadosDaVacina.dados[0].tomada_em == null
                    ? <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => { insereVacina(dadosDaVacina.id_vacina, id_usuario) }}
                    >
                      <Text style={styles.textStyle}>Insere</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => { validarVacina(dadosDaVacina.id_vacina, id_usuario) }}
                    >
                      <Text style={styles.textStyle}>Validar</Text>
                    </TouchableOpacity>
                  : <View />
              }

            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
