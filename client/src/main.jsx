/* PUNTO DE ENTRADA PARA RENDERIZADO */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';

// (App) en el elemento con id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root')); // Se crea un root de React y se renderiza el componente App dentro de él.
// Este root se conecta al elemento del DOM con id 'root'.
// Se utiliza React.StrictMode para resaltar posibles problemas en la aplicación.
root.render(
  <React.StrictMode> {/* Modo estricto de React para detectar problemas potenciales */}
    <App />
  </React.StrictMode>
);