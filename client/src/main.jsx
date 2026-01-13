/*
 * Project: SightStatusJr
 * Author: Juan Ramón Madrid Medina
 * Year: 2026 
 * License: MIT
 */
/* PUNTO DE ENTRADA PARA RENDERIZADO */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);