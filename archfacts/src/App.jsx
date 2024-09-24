import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx'; 
import NivelUsuario from './pages/nivel_usuario.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/nivel-usuario" element={<NivelUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;