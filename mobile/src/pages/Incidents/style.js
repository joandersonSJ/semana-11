import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container:{
    flex: 1,
    //Só existe no react native e corresponde a padding: 0 24px;
    paddingHorizontal: 24,
    //Vai dar um padding no topo do tamanho da status bar + 20px
    paddingTop: Constants.statusBarHeight + 20,
  },
  header:{
    //Por padrão é column
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  headerText:{
    fontSize: 16,
    color: '#737380'
  },
  headerTextBold:{
    fontWeight: 'bold'
  },
  title:{
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a'
  },
  description:{
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },
  incidentsList:{
    marginTop: 32,
  },
  incidents:{
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16
  },
  incidentsProperty:{
    fontSize: 14,
    color: '#41414D',
    fontWeight: 'bold'
  },
  incidentsValue:{
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },
  detailsButton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailsButtonText:{
    color: '#E02041',
    fontSize: 15,
    fontWeight: '700'
  }
})
