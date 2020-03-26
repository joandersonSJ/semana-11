import React,{ useState, useEffect } from 'react';
import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'

import './style.css';

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ value, setValue] = useState();


  const OngID = localStorage.getItem('OngID')
  //const OngName = localStorage.getItem('OngName')
  const history = useHistory();

  //Verifica se o usuario está logado 
  useEffect(()=>{
    if(!OngID){
      history.push('/');
    }
  },[OngID, history])

  async function handleAddIncident(evento){

    evento.preventDefault();

    const data = { 
      title,
      description,
      value
    }

    try {

      await api.post('/incidents', data,{
        headers:{
          Authorization: OngID
      }})

      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar')
    }
  }


  return(
    <div className="newIncidents-container">
    <div className="content">
      <section>
      <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
      
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041" />
          Voltar para home
        </Link>
      </section>

      <form onSubmit={handleAddIncident}>
        <input 
        placeholder="Titulo do caso"
        value={title}
        onChange={evento => setTitle(evento.target.value)}
        />
        
        <textarea 
        placeholder="Descrição"
        value={description}
        onChange={evento => setDescription(evento.target.value)}
        />
        <input 
        placeholder="Valor em reais"
        value={value}
        onChange={evento => setValue(evento.target.value)}
        />
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>    
  );
}