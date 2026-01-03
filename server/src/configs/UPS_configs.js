/* CONFIGURACIÓN A LA UPS */
import { config } from "dotenv"; // Permite ejecutar la función config y cargar las variables de entorno en process.env

// Ejecuto la configuración para que las variables de entorno estén disponibles
config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" // en desarrollo puede no existir, no rompe
});

// Exporto un objeto por defecto que contiene las credenciales y el comando para la conexión a la UPS
// Si alguna variable no está definida en el .env, se asigna un string vacío
export default {
  UPSusername: process.env.UPS_USERNAME || "",   // Usuario para acceder a la UPS
  UPSpassword: process.env.UPS_PASSWORD || "",   // Contraseña del usuario de la UPS
  UPScommand: process.env.UPS_COMMAND || ""      // Comando que se va a ejecutar en la UPS
};