import React, { useEffect } from 'react';
import Modal from 'react-modal' // import para criar modais com React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rotas from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  useEffect(() => {
    Modal.setAppElement('#root');
  })

  return (
    <>
      <Rotas />
      <ToastContainer />
    </>
  );
}


export default App;