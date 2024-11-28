import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './utils/global.css';
import '../index.html';

const initializeVLibras = () => {
  if (window.VLibras) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  } else {
    console.error('VLibras não carregado');
  }
};

document.addEventListener('DOMContentLoaded', initializeVLibras);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);