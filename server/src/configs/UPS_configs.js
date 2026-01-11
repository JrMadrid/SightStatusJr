/* CONFIGURACIÓN A LA UPS */
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

export default {
  UPSusername: process.env.UPS_USERNAME || "", // Usuario para acceder a la UPS
  UPSpassword: process.env.UPS_PASSWORD || "", // Contraseña del usuario de la UPS
  UPScommand: process.env.UPS_COMMAND || "" // Comando que se va a ejecutar en la UPS
};