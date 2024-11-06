import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './utils/global.css';
import '../index.html';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)