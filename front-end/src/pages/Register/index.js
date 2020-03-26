import React,{ useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import './style.css';

export default function Register(){


  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ whatsapp, setWhatsApp ] = useState('');
  const [ city, setCity ] = useState('');
  const [ uf, setUf ] = useState('');
  const history = useHistory();


  async function handleRegister(evento){
    evento.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }
    try {

      const response = await api.post('/ongs', data);

      alert(`Seu ID de acesso é: ${response.data.id} :D`) 
      history.push('/');
    } catch (error) {
      alert("Erro no cadastro, tente novamente")  
    }
    
  }


  return(
    <div className="register-container">
      <div className="content">
        <section>
        <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Efetuar logon
          </Link>
        
        </section>

        <form onSubmit={handleRegister}>
          
          <input 
          placeholder="Nome da ONG"
          value={name}
          // vai escutar as modificações no input, usar esse evento
          // e setar o valor dele mesmo no estado name
          onChange={evento => setName(evento.target.value)}/>
          
          <input type="email" 
          placeholder="Email"
          value={email}
          onChange={evento => setEmail(evento.target.value)}/>
          
          <input 
          placeholder="whatsapp"
          value={whatsapp}
          onChange={evento => setWhatsApp(evento.target.value)}/>
            
            <div className="input-group">
              
              <input 
              placeholder="Cidade"
              value={city}
              onChange={evento => setCity(evento.target.value)}/>
              
              <input 
              placeholder="Uf" 
              value={uf}
              onChange={evento => setUf(evento.target.value)}
              style={{ width: 80 }}/>
            
            </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>    
  )
}