import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rotas from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Rotas />,
      <ToastContainer />
    </>
  );
}


export default App;