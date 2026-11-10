/* CONFIGURACIÓN GLOBAL DE AXIOS */
import axios from 'axios'; // Importa la librería axios para realizar solicitudes HTTP
import { mockAxiosAdapter, mocksEnabled } from '../mocks/mockApi';

// Configura axios para enviar cookies con cada solicitud
axios.defaults.withCredentials = true; // Permite el uso de cookies en solicitudes CORS

if (mocksEnabled) {
  axios.defaults.adapter = mockAxiosAdapter;
}

export default axios;