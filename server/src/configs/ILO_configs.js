/* CONFIGURACIÓN A LA ILO */
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

export default {
  ILOusername: process.env.ILO_USERNAME || "", // Usuario para acceder a la ILO
  ILOpassword: process.env.ILO_PASSWORD || "", // Contraseña del usuario de la ILO
  ILOcommand: process.env.ILO_COMMAND || "" // Comando que se va a ejecutar en la ILO
};