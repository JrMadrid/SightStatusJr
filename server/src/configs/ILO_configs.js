/* CONFIGURACIÓN A LA ILO */
import { config } from "dotenv"; // Permite ejecutar la función config y cargar las variables de entorno en process.env

config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" // en desarrollo puede no existir, no rompe
});

// Exporto un objeto por defecto que contiene las credenciales y el comando para la conexión a la ILO
// Si alguna variable no está definida en el .env, se asigna un string vacío
export default {
  ILOusername: process.env.ILO_USERNAME || "",  // Usuario para acceder a la ILO
  ILOpassword: process.env.ILO_PASSWORD || "",  // Contraseña del usuario de la ILO
  ILOcommand: process.env.ILO_COMMAND || ""     // Comando que se va a ejecutar en la ILO
};