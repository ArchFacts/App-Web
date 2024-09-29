import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NivelUsuario from './pages/nivel_usuario.jsx';
import Cadastro from './pages/cadastro.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar/:tipo" element={<Cadastro />} />
        <Route path="/nivel-usuario" element={<NivelUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;