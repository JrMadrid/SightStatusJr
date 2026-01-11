/* CONEXIÓN A LA BASE DE DATOS DE SESSION */
import config from "../configs/DB_config.js";
import { Sequelize } from 'sequelize';
import tedious from 'tedious';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';

// Configuración de Sequelize para conectar a SQL Server
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host, // Host de la base de datos
  dialect: 'mssql', // Dialecto de la base de datos  
  dialectModule: tedious, // Módulo para la conexión a SQL Server
  logging: false, // Desactivar el logging de Sequelize  
  port: 1433
});

// Verifica la conexión a la base de datos
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate(); // Autenticación de la conexión
    console.log('Conexión establecida a la base de datos de sesiones con éxito.');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

// Crea una instancia de SequelizeStore para almacenar sesiones en la base de datos usando sequelize
const Store = SequelizeStore(session.Store);
const store = new Store({
  db: sequelize,
});

// Sincronizar la base de datos para crear las tablas de sesión si una existen
const syncStore = async () => {
  try {
    await store.sync(); // Sincronizar la base de datos 
    console.log('Base de datos de sesiones sincronizada.');
  } catch (err) {
    console.error('Error al sincronizar la base de datos de sesiones:', err);
    process.exit(1); // Salir del proceso si hay un error
  }
};

export { sequelize, connectToDatabase, syncStore, store }; 