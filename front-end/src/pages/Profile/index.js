import React,{ useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom'

import { FiPower, FiTrash2 } from 'react-icons/fi'

import './style.css';


export default function Profile(){

  const [ incidents, setIncidents ] = useState([]);

  const OngID = localStorage.getItem('OngID')
  const OngName = localStorage.getItem('OngName')

  const history = useHistory();

  //Verifica se o usuario está logado 
  useEffect(()=>{
    if(!OngID){
      history.push('/');
    }
  },[OngID, history])

  //Povoar o array incidents
  useEffect(() =>{
  
    api.get('/profile',{
      headers:{
        Authorization: OngID
      }
    }).then(response =>{
      setIncidents(response.data);
    })
  
  
  },[OngID])


  async function handleDeleteIncidents(id){

    try {

    await api.delete(`/incidents/${id}`,{
      headers:{
        Authorization: OngID
      }
    });
      
      setIncidents(incidents.filter( incident => incident.id !== id))

    } catch (error) {
      alert('Erro ao deletar')
    }

  }

  function handleLogout(){
    localStorage.clear();
    
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, { OngName }</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={ 18 } color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => {
          return(
            <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{ incident.title }</p>
          
            <strong>DESCRIÇÃO:</strong>
            <p>{ incident.description }</p>
  
            <strong>VALOR:</strong>
            
            {/* Codigo responsavel por formatar o valor pra real */}
            <p>            
            { Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' })
            .format(incident.value) }
            </p>
            
            <button onClick={() => handleDeleteIncidents(incident.id)} type="button">
              <FiTrash2 size={ 18 } color="#a8a8b3" />
            </button>
          </li>
          )
        })}
      </ul>
    </div>
  )
}