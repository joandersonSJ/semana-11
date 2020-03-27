import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import  * as MailComposer from 'expo-mail-composer';



import style from './style'

import logoImg from '../../assets/logo.png';

export default function Detailes(){
  
  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const message = `Olá ${ incident.name }, estou entrando em contato pois gostaria de ajudar no caso "${ incident.title }" com o valor de "${ Intl.NumberFormat('pt-BR',
  {style: 'currency',
  currency: 'BRL'})
  .format(incident.value) }"`


  function navigateToIncidents(){
    //Retorna para a rota anterior
    navigation.goBack();
  }
  
  function sendMail(){

    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.name}`,//Assunto
      recipients: [ `${ incident.email }` ],//Pra quem será enviado
      body: message//Conteudo da mensagem
    })
  }

  function sendWhatsApp(){
    Linking.openURL(`whatsapp://send?phone=557182868468&text=${message}`)
  }

  return(
    <View style={ style.container }>
      
      {/* header */}
      <View style={ style.header }>
        <Image source={ logoImg }/>
        
        <TouchableOpacity 
        onPress={ navigateToIncidents }
        style={ style.detailesButton }>
          <Feather 
          name="arrow-left"
          size={ 28 }
          color="#E02041"></Feather>
        </TouchableOpacity>

      </View>
      
      <FlatList 
         data={ [incident] }
          keyExtractor={ incident => String(incident) }
          showsVerticalScrollIndicator={ false }
          renderItem={ () => (
                <>
                  <View style={ style.incidents }>
                  {/* Posso passar um objeto como identificador de estilização e passar mais atributos */}
                  <Text style={ [ style.incidentsProperty,{ marginTop: 0} ] }>Ong:</Text>
                    
                  <Text style={ style.incidentsValue }>
                    { incident.name } de 
                    { incident.city }/{ incident.uf }
                  </Text>

                  <Text style={ style.incidentsProperty }>Caso:</Text>
                  <Text style={ style.incidentsValue }>{ incident.title }</Text>
                  
                  <Text style={ style.incidentsProperty }>Descrição:</Text>
                  <Text style={ style.incidentsValue }>{ incident.description }</Text>

                  <Text style={ style.incidentsProperty }>Valor:</Text>
                  <Text style={ style.incidentsValue }>
               
                  { Intl.NumberFormat('pt-BR',
                  {style: 'currency',
                  currency: 'BRL'})
                  .format(incident.value) }

                  </Text>
                </View>

                <View style={ style.contactBox }>
                  <Text style={ style.heroTitle }>Salve o dia!</Text>        
                  <Text style={ style.heroTitle }>Seja o herói desse caso.</Text>        
                
                  <Text style={ style.heroDescription }>Seja o herói desse caso.</Text>        
              
                  <View style={ style.actions }>

                    <TouchableOpacity style={ style.action } onPress={ sendWhatsApp }>
                      <Text style={ style.actionText }>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ style.action } onPress={ sendMail }>
                      <Text style={ style.actionText }>E-mail</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </>
            ) }
          />
    </View>
  )
}
