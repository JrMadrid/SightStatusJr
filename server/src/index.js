/*
 * Project: SightStatusJr
 * Author: Juan Ramón Madrid Medina
 * Year: 2026 
 * License: MIT
 */
/* INICIO DEL SERVIDOR - SIGHTSTATUSJR */
import { connectToDatabase, syncStore } from './infra/sessionStore.js';
import dbConnection from './db/connection.js';
import app from './app.js';
import config from './configs/APP_config.js';
import semillas from './db/seeds.js';
import debug from 'debug';

let server;
const debugServer = debug('app:server');
const host = config.APPhost;
const port = config.APPport;

// Logs según entorno
if (process.env.NODE_ENV === 'development') {
  debug.enable('app:*');
} else {
  debug.disable();
}

// Reintentos controlados (tu versión, correcta)
const intentos = async (fn, retries, delay = 10000, name = 'operación') => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      console.error(`Error en ${name}, intento ${attempt}/${retries}:`, err.message);
      if (attempt >= retries) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

const startServer = async () => {
  try {
    await intentos(dbConnection, 5, 10000, 'Conexión BD principal');
    await semillas();// Insertar datos iniciales en la base de datos
    await intentos(connectToDatabase, 5, 10000, 'Conexión BD sesiones');
    await intentos(syncStore, 3, 3000, 'Sincronización sesiones');

    server = app.listen(port, '0.0.0.0', () => {
      console.log(`SightStatusJr Backend en http://${host}:${port}`);
      console.log(`Entorno: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    console.error('Error crítico al iniciar el servidor:', err);
    process.exit(1);
  }
};

// Graceful shutdown (clave para PM2)
const shutdown = (signal) => {
  console.log(`${signal} recibido, cerrando servidor...`);
  if (server) {
    server.close(() => {
      console.log('Servidor cerrado correctamente');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Errores globales (muy importante)
process.on('uncaughtException', (err) => {
  console.error('Excepción no controlada:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Promesa rechazada sin catch:', reason);
});

/* Simular errores */
// throw new Error('Error de prueba: excepción no controlada'); // Simular una excepción no controlada
// Promise.reject('Error de prueba: promesa rechazada sin catch'); // Simular un rechazo no manejado

startServer();

export { server };