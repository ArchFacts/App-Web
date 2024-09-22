import React, { useState } from 'react';
import Input from '../components/input.jsx';
import Botao from '../components/botao.jsx';
import '../index.css';
import '../components/input.css'
import '../components/botao.css'
import '../components/imagem.css'
import SimpleHeader from '../components/simple_header.jsx';
import '../components/simple_header.css'

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className='container'>
      <SimpleHeader/>
     <div className='container2'>
      <div className='container-cadastro'>
        <div className='registro'>
          <h1>Registro</h1>

          <Input
            label="Nome:"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            label="Telefone:"
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
          <Input
            label="Email:"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Senha:"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <Input
            label="Confirmação de Senha:"
            type="password"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
          />

          <Botao texto="Cadastrar" onClick={console.log('cadastro clicado')} />
        </div>
        <div className='registro-imagem'>
        <img className='imagem' src="/assets/imgs/fundo_cadastro.png" alt="" />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Cadastro;
