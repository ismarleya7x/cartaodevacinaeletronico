import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, BaseRouter } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, SafeAreaView, Text, Image, Linking, TouchableOpacity, AsyncStorage } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import api from 'axios';


import staticProfile from '../../assets/static-profile.png';
import styles from './styles';


export default function Index({ route }) {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  let user = route.params.user;

  useEffect(() => {
    user =     route.params.user;
    //console.log("HOME USER PARAMS")

    //console.log(user)
  }, [route.params.user])
  
  useEffect(() => {
    async function getInformation() {
      const retorno = await api.get('http://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=34361911194e4c52802763d0441eaba2');

      setNews(retorno.data.articles);

    }
    getInformation();
  }, []);

  function handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        //console.log("Don't know how to open URI: " + url);
      }
    });
  };

  function _renderItem({ item, index }) {
    return (
      <View style={styles.menuItem}>
        <Text style={styles.itemTitulo}>{item.title}</Text>
        <Text
          style={styles.itemConteudo}
          numberOfLines={10}
          ellipsizeMode={'clip'}
        >
          {item.content.split("[")[0]}
        </Text>
        <TouchableOpacity
          style={styles.newsDetalhes}
          onPress={() => handleClick(item.url)}
        >
          <Text style={styles.textoDetalhe}>Ler matéria completa</Text>
          <Feather name="arrow-right" size={16} color="#e02041" />
        </TouchableOpacity>
        <Text style={styles.homeTitle}></Text>
      </View>

    )
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
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Cartão de Vacina Eletrônico!
        </Text>
      </View>
      <View style={styles.viewProfile}>
        {
          !user.foto 

          ? <Image source={staticProfile} style={styles.profilePic} />

          : <Image source={{ uri: user.foto }} style={styles.profilePic} />
        }
        
        <TouchableOpacity onPres={() => { }}>
          <Text style={styles.editaPerfil}>Editar perfil</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Seja bem vindo, {user.nome_completo.split(" ")[0]}!</Text>
        <Text style={styles.homeTitle}>Últimas notícias</Text>
      </View>

      <View style={styles.menuList}>
        <Carousel
          data={news}
          sliderWidth={330}
          itemWidth={325}
          renderItem={_renderItem}
        />
      </View>
    </View>
  )
}
