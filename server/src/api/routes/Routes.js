/* RUTAS DE LA APLICACIÓN */
import path from 'path'; // Importa el módulo 'path', que proporciona utilidades para trabajar con rutas de archivos y directorios
import { fileURLToPath } from 'url'; // Importa la función 'fileURLToPath' desde el módulo 'url', que convierte una URL de archivo a una ruta de archivo local
import { requireUserSession as USER } from '../../middlewares/controllersMid.js';

const __filename = fileURLToPath(import.meta.url); // Convierte la URL del archivo actual a una ruta de archivo local
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual

import authRou from './authRou.js'; // Rutas de autenticación de usuarios
/* Paneles de administracion */
import panelUserRou from './Paneles/panelUsersRou.js'; // Rutas para administrar usuarios
import panelSucursalRou from './Paneles/panelSucursalRou.js' // Rutas para administrar sucursales
import panelDispositivosRou from './Paneles/panelDispositivosRou.js'; // Rutas para administrar dispositivos
import panelMantenimientoRou from './Paneles/panelMatenimientoRou.js'; // Rutas para administrar mantenimientos
import panelManualesRou from './Paneles/panelManualesRou.js' // Rutas para administrar manuales
import panelInformeRou from './Paneles/panelInformeRou.js'; // Rutas para administrar informes
/* Paginas Informativas */
import UsuarioInfoRou from './Informativas/UsuarioInfoRou.js'; // Rutas de informativa -- Usuario
import SucursalInfoRou from './Informativas/SucursalInfoRou.js'; // Rutas de informativa -- Sucursal
import UbicacionInfoRou from './Informativas/UbicacionInfoRou.js'; // Rutas de informativa -- Ubicación
import DispositivosInfoRou from './Informativas/DispositivosInfoRou.js'; // Rutas de informativa -- Dispositivos
import MantenimientoInfoRou from './Informativas/MantenimientoInfoRou.js'; // Rutas de informativa -- Mantenimiento
import ManualInfoRou from './Informativas/ManualInfoRou.js'; // Rutas de informativa -- Manual
import InformeInfoRou from './Informativas/InformeInfoRou.js'; // Rutas de informativa -- Informes

// Todas las rutas
export const Routes = (app) => {
  app.use('/auth', authRou); // Rutas de autenticación de usuarios
  app.use('/panel', USER, panelUserRou); // Rutas para administrar usuarios
  app.use('/panel', USER, panelSucursalRou);  // Rutas para administrar sucursales
  app.use('/panel', USER, panelDispositivosRou); // Rutas para administrar dispositivos
  app.use('/panel', USER, panelMantenimientoRou); // Rutas para administrar mantenimientos
  app.use('/panel', USER, panelManualesRou); // Rutas para administrar manuales
  app.use('/panel', USER, panelInformeRou); // Rutas para administrar informes
  app.use('/informe', USER, UsuarioInfoRou); // Rutas de informativa -- Usuario
  app.use('/informe', USER, SucursalInfoRou); // Rutas de informativa -- Sucursal
  app.use('/informe', USER, UbicacionInfoRou); // Rutas de informativa -- Ubicación
  app.use('/informe', USER, DispositivosInfoRou); // Rutas de informativa -- Dispositivos
  app.use('/informe', USER, MantenimientoInfoRou); // Rutas de informativa -- Mantenimiento
  app.use('/informe', USER, ManualInfoRou); // Rutas de informativa -- Manual
  app.use('/informe', USER, InformeInfoRou); // Rutas de informativa -- Informes
  // Ruta para manejar todas las peticiones que no coinciden con las rutas definidas anteriormente y servir el index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public', 'index.html')); // Envía el archivo 'index.html' como respuesta a cualquier ruta no definida
  });
};