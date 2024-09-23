import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NivelUsuario from './pages/nivel_usuario.jsx';

function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/nivel-usuario" element={<NivelUsuario />} />
      </Routes>
    </Router>
  );
}

export default App2;
;