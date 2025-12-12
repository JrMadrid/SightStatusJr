/* RUTAS DE LA APLICACIÓN */
import path from 'path'; // Importa el módulo 'path', que proporciona utilidades para trabajar con rutas de archivos y directorios
import { Router } from 'express';
import { fileURLToPath } from 'url'; // Importa la función 'fileURLToPath' desde el módulo 'url', que convierte una URL de archivo a una ruta de archivo local
import { requireUserSession as USER } from '../../middlewares/controllersMid.js';

const __filename = fileURLToPath(import.meta.url); // Convierte la URL del archivo actual a una ruta de archivo local
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual

import authRou from './authRou.js'; // Rutas de autenticación de usuarios
/* Paneles de administracion */
import panelUserRou from './Paneles/panelUsersRou.js';
import panelSucursalRou from './Paneles/panelSucursalRou.js'
import panelDispositivosRou from './Paneles/panelDispositivosRou.js';
import panelMantenimientoRou from './Paneles/panelMatenimientoRou.js';
import panelManualesRou from './Paneles/panelManualesRou.js'
import panelInformeRou from './Paneles/panelInformeRou.js';
/* Paginas Informativas */
import UsuarioInfoRou from './Informativas/UsuarioInfoRou.js';
import SucursalInfoRou from './Informativas/SucursalInfoRou.js';
import UbicacionInfoRou from './Informativas/UbicacionInfoRou.js';
import DispositivosInfoRou from './Informativas/DispositivosInfoRou.js';
import MantenimientoInfoRou from './Informativas/MantenimientoInfoRou.js';
import ManualInfoRou from './Informativas/ManualInfoRou.js';
import InformeInfoRou from './Informativas/InformeInfoRou.js';

// Todas las rutas
export const Routes = (app) => {
  const apiRouter = Router();

  // RUTAS 
  apiRouter.use('/auth', authRou); // Autenticación de usuarios
  apiRouter.use('/panel', USER, panelUserRou); // Administrar usuarios
  apiRouter.use('/panel', USER, panelSucursalRou);  // Administrar sucursales
  apiRouter.use('/panel', USER, panelDispositivosRou); // Administrar dispositivos
  apiRouter.use('/panel', USER, panelMantenimientoRou); // Administrar mantenimientos
  apiRouter.use('/panel', USER, panelManualesRou); // Administrar manuales
  apiRouter.use('/panel', USER, panelInformeRou); // Administrar informes
  apiRouter.use('/informativa', USER, UsuarioInfoRou); // Informativa -- Usuario
  apiRouter.use('/informativa', USER, SucursalInfoRou); // Informativa -- Sucursal
  apiRouter.use('/informativa', USER, UbicacionInfoRou); // Informativa -- Ubicación
  apiRouter.use('/informativa', USER, DispositivosInfoRou); // Informativa -- Dispositivos
  apiRouter.use('/informativa', USER, MantenimientoInfoRou); // Informativa -- Mantenimiento
  apiRouter.use('/informativa', USER, ManualInfoRou); // Informativa -- Manual
  apiRouter.use('/informativa', USER, InformeInfoRou); // Informativa -- Informes

  app.use('/api', apiRouter); // Prefijo global

  // SPA FALLBACK
  // Ruta para manejar todas las peticiones que no coinciden con las rutas definidas anteriormente y servir el index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public', 'index.html')); // Envía el archivo 'index.html' como respuesta a cualquier ruta no definida
  });
};