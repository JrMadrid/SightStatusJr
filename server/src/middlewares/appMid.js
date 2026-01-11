/* MIDDLEWARES DE LA APLICACIÓN - CORESIGHTJR */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import config from '../configs/APP_config.js';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from '../infra/sessionStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const appMiddlewares = (app) => {
  app.use(cors({
    origin: config.DEV ? config.CORS_ORIGIN : false,
    credentials: true
  }));

  // Logging según entorno
  app.use(morgan(config.DEV ? 'dev' : 'combined'));

  // Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Session configuration para intranet
  app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Intranet sin HTTPS
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 días
      httpOnly: true,
      sameSite: 'lax', // Adecuado para intranet
      domain: config.DEV ? '' : config.APPhost,
      path: '/'
    },
    store: store,
    name: 'coresightjr_session' // Nombre específico de cookie
  }));

  // Archivos estáticos
  app.use(express.static(path.join(__dirname, '../../public')));
};