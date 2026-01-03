/* CONFIGURACIÓN AL BIOMETRICO */
import { config } from "dotenv"; // Permite ejecutar la función config y cargar las variables de entorno en process.env

config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" // en desarrollo puede no existir, no rompe
});

// Exporto un objeto por defecto que contiene las credenciales y el puerto del biométrico
// Estos valores se obtienen desde el archivo .env o se dejan en vacío si no están definidos
export default {
  BIOMETRICOusername: process.env.BIOMETRICO_USERNAME || "",  // Usuario del biométrico
  BIOMETRICOpassword: process.env.BIOMETRICO_PASSWORD || "",  // Contraseña del biométrico
  BIOMETRICOpuerto: process.env.BIOMETRICO_PUERTO || "",      // Puerto donde se conecta el biométrico
};