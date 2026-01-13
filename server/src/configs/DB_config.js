/* CONFIGURACIÓN DE BASE DE DATOS - SIGHTSTATUSJR */
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

export default {
  host: process.env.DB_HOST || "localhost", // Dirección o IP del servidor de la base de datos
  database: process.env.DB_DATABASE || "SightStatusJr_DB", // Nombre de la base de datos
  user: process.env.DB_USER || "sa", // Usuario de la base de datos
  password: process.env.DB_PASSWORD || "" // Contraseña del usuario de la base de datos
};