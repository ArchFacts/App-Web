import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx'; 
import NivelUsuario from './pages/nivel_usuario.jsx';
import CadastroBeneficiario from './pages/cadastro_beneficiario.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar-beneficiario" element={<CadastroBeneficiario />} />
        <Route path="/nivel-usuario" element={<NivelUsuario />} />
        <Route path="/cadastrar" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;