import React,{ useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api'

//Será trazido a melhor logo possivel para o dispositivo do usuario
import logoImg from '../../assets/logo.png';
import style from './style'

export default function Incidents(){
  
  const [ incidents, setIncidents ] = useState([]);
  
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);

  const [ total, setTotal ] = useState(0);
  const navigation = useNavigation();
  //semelhante ao history da web, nomes diferentes entre package e variavel



  async function loadIncidents(){

    if(loading){
      return;
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true)

      const response = await api.get('incidents',{
       params: { page } 
      });

      setIncidents([ ...incidents,...response.data ]);
      setTotal(response.headers['x-total-count'])//case sensitive
      setPage(page + 1)

    setLoading(false)
  }



  function navigateToDetail(incident){
    navigation.navigate('Detail',{ incident })
  }  
  

  useEffect(()=>{
    loadIncidents()
  },[])

  return(
    <View style={ style.container }>
      <View style={ style.header }>
        <Image source={ logoImg } />
        <Text style={ style.headerText }>
          Total de casos: <Text style={ style.headerTextBold }>{ total } casos</Text>
        </Text>
      </View>
        
        <Text style={ style.title }>Bem vindo!</Text>
        <Text style={ style.description }>
          Escolha um dos casos abaixo e salve o dia
        </Text>
    
        <FlatList 
          //data é o array que irá montar essa lista caso n tenha 
          //ainda posso colocar qualquer coisa
         data={incidents}
         style={ style.incidentsList }
          //vai pegar os valores do data e usar como key, igual ao reactJS
          //e pode ser qualquer nome, pq será tirado do data
          keyExtractor={ incident => String(incident.id) }
          //showsVerticalScrollIndicator={ false }//Remove o scroll vertical, tb tenho para horizontal
          onEndReached={ loadIncidents }
          onEndReachedThreshold={ 0.2 }
          renderItem={ ({ item: incident }) => (//item é a variavel padrão e eu estou substituindo ela pelo incident
            <View style={ style.incidents }>
              <Text style={ style.incidentsProperty }>Ong:</Text>
              <Text style={ style.incidentsValue }>{ incident.name }</Text>

              <Text style={ style.incidentsProperty }>Caso:</Text>
              <Text style={ style.incidentsValue }>{ incident.title }</Text>
              
              <Text style={ style.incidentsProperty }>Valor:</Text>
              <Text style={ style.incidentsValue }>

                {/* Formatação de numero pra moeda Real */}
                { Intl.NumberFormat('pt-BR',
               {style: 'currency',
               currency: 'BRL'})
               .format(incident.value) }
               
               </Text>

              {/* Substituto do botão porque o button vem com estilização propria */}
              <TouchableOpacity 
              style={ style.detailsButton }
              onPress={ () => navigateToDetail(incident) }>
                
                {/* Texto do "botão" */}
                <Text 
                style={ style.detailsButtonText }>
                  Ver mais detalhes
                </Text>
              {/* Icone que irá aparecer na tela, o name é do site feather icon */}
              <Feather name="arrow-right" 
              size={ 17 } 
              color="#E02041"></Feather>
            </TouchableOpacity>
          </View>
         ) }
        />
    </View>
  )
}