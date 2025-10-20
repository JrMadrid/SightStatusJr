/* RUTAS DE PANEL DE MANTENIMIENTOS */
import express from 'express';
import multer from 'multer'; // Middleware para manejar multipart/form-data
import { requireUserSession, requireAdminSession } from '../../../middlewares/controllersmid.js';
import { methods as panelMantenimientoCon } from '../../controllers/Paneles/panelMantenimientoCon.js';
const panelMantenimientoRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas
const upload = multer(); // Almacena los archivos en memoria

// Middleware
panelMantenimientoRou.use(express.urlencoded({ extended: true })); // Configura el middleware para analizar los datos de formulario URL-encoded

panelMantenimientoRou.get('/mantenimientos', requireUserSession, panelMantenimientoCon.getMantenimientos); // Pedir los datos de los mantenimientos -- /panel/mantenimientos
panelMantenimientoRou.post('/mantenimientos/agregar', requireAdminSession, panelMantenimientoCon.postMantenimiento); // Agregar un nuevo mantenimiento -- /panel/mantenimientos/agregar
panelMantenimientoRou.post('/mantenimientos/constancia/agregar', requireUserSession ,upload.single('imagen'), panelMantenimientoCon.postConstancia); // Agregar constancia de mantenimiento -- /panel/mantenimientos/constancia/agregar
panelMantenimientoRou.post('/mantenimientos/actualizar', requireAdminSession, panelMantenimientoCon.updateMantenimiento); // Actualizar un mantenimiento -- /panel/mantenimientos/actualizar
panelMantenimientoRou.post('/mantenimientos/eliminar', requireAdminSession, panelMantenimientoCon.deleteMantenimiento); // Eliminar un mantenimiento -- /panel/mantenimientos/eliminar

export default panelMantenimientoRou;