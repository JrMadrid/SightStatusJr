/* CONFIGURACIÓN AL BIOMETRICO */
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

export default {
  BIOMETRICOusername: process.env.BIOMETRICO_USERNAME || "", // Usuario del biométrico
  BIOMETRICOpassword: process.env.BIOMETRICO_PASSWORD || "", // Contraseña del biométrico
  BIOMETRICOpuerto: process.env.BIOMETRICO_PUERTO || "", // Puerto donde se conecta el biométrico
};