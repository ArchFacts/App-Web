import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NivelUsuario from './pages/Nivel-Usuario/nivel_usuario.jsx';
import CadastroUsuario from './pages/Cadastro/cadastro_usuario.jsx';
import '../index.html';
import CadastroEmpresa from './pages/Cadastro/cadastro_empresa.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar/:tipo" element={<CadastroUsuario />} />
        <Route path="/nivel-usuario" element={<NivelUsuario />} />
        <Route path='/cadastrar-empresa' element={<CadastroEmpresa/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;