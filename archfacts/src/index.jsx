// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './utils/global.css';
import '../index.html';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);