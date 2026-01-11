/* CONFIGURACIÓN DE LA APLICACIÓN - CORESIGHTJR */
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

export default {
  APPhost: process.env.APP_HOST || "localhost", // Host donde en el que se ejecuta la aplicación
  APPport: parseInt(process.env.APP_PORT) || 88, // Puerto donde en el que se ejecuta la aplicación
  DEV: process.env.NODE_ENV === "development", // Modo de desarrollo
  MOCKS: process.env.MOCKS === 'true', // Modo de desarrollo usa datos falsos que simulan dispositivos
  SESSION_SECRET: process.env.SESSION_SECRET || "secret_key",
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};