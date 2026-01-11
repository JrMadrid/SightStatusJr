/* DEFINE LA ESTRUCTURA Y LA LÓGICA PRINCIPAL DE LA APLICACIÓN */
import express from 'express';
import { handleUncaughtExceptions, handleUnhandledRejections } from './utils/errorHandlers.js';
import { appMiddlewares } from './middlewares/appMid.js';
import { Routes } from './api/routes/Routes.js';
import { multerErrorHandler } from './middlewares/multerMid.js';
const app = express();

/* Manejo de errores globales */
handleUncaughtExceptions();
handleUnhandledRejections();

/* Middlewares */
appMiddlewares(app);

/* Rutas */
Routes(app);

/* Multer */
multerErrorHandler(app);

export default app;