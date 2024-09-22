import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
;