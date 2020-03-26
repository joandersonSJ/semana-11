import React,{ useState } from 'react';
import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import './style.css';




export default function Logon(){

  const [ id, setId ] = useState('');
  const history = useHistory();
  
  async function handleLogin(evento){
    evento.preventDefault();
  
    try {
      
      const response = await api.post('/sessions', { id }); 
      //Precisa ser um objeto porq eu eu estou desestruturando no back
      
      const name = response.data.name;

      console.log(name);
      
      localStorage.setItem('OngID', id)
      localStorage.setItem('OngName', name)
      
      history.push('/profile');

    } catch (error) {
      console.log('Falha no login, tente novamente.')
    }
  }



  return(
    <div className="logon-container">
      <section className="form">
        <img src={ logoImg } alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
          placeholder="Sua ID"
          value={id}
          onChange={evento => setId(evento.target.value)}
          />
          
          <button className="button" type="submit">Entrar</button>
          
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    <img src={ heroesImg } alt="heroes"/>
    </div>
  );
}