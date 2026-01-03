/* CONFIGURACIÓN A LA BASE DE DATOS */
// Importo el módulo 'dotenv' para poder acceder a las variables de entorno definidas en el archivo .env
import { config } from "dotenv"; // Permite ejecutar la función config y cargar las variables de entorno en process.env

// Ejecuto la configuración para que las variables de entorno estén disponibles
config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" // en desarrollo puede no existir, no rompe
});

// Exporto un objeto por defecto que contiene los datos de configuración para la conexión a la base de datos
// Cada valor se obtiene desde las variables de entorno o queda vacío si no está definido
export default {
  host: process.env.DB_HOST || "",         // Dirección o IP del servidor de la base de datos
  database: process.env.DB_DATABASE || "", // Nombre de la base de datos
  user: process.env.DB_USER || "",         // Usuario de la base de datos
  password: process.env.DB_PASSWORD || ""  // Contraseña del usuario de la base de datos
};