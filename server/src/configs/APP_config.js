/* CONFIGURACIÓN DE LA APLICACIÓN */
// Importo el módulo 'dotenv' para poder leer las variables de entorno definidas en el archivo .env
import { config } from "dotenv"; // Permite ejecutar la función config y cargar las variables de entorno en process.env

// Ejecuto la configuración para que las variables de entorno estén disponibles
config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" // en desarrollo puede no existir, no rompe
});

// Exporto un objeto por defecto que contiene las credenciales y el puerto del biométrico
// Estos valores se obtienen desde el archivo .env o se dejan en vacío si no están definidos
export default {
  APPhost: process.env.APP_HOST, // Host donde en el que se ejecuta la aplicación
  APPport: Number(process.env.APP_PORT) || 88, // Puerto donde en el que se ejecuta la aplicación
  DEV: process.env.DEV == "true", // Modo de desarrollo
  MOCKS: process.env.MOCKS == "true" // Modo MOCK -- Datos de dispositivos para formato
};