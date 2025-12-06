/* RUTAS DE PANEL DE MANTENIMIENTOS */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelMantenimientoCon.js';
const panelMantenimientoRou = express.Router();  

panelMantenimientoRou.get('/mantenimientos', CN.getMantenimientos); // Pedir los datos de los mantenimientos -- /panel/mantenimientos
panelMantenimientoRou.post('/mantenimientos/agregar', ADMIN, CN.postMantenimiento); // Agregar un nuevo mantenimiento -- /panel/mantenimientos/agregar
panelMantenimientoRou.post('/mantenimientos/constancia/agregar', subir.Foto.single('imagen'), CN.postConstancia); // Agregar constancia de mantenimiento -- /panel/mantenimientos/constancia/agregar
panelMantenimientoRou.put('/mantenimientos/actualizar/:id', ADMIN, CN.updateMantenimiento); // Actualizar un mantenimiento -- /panel/mantenimientos/actualizar/:id
panelMantenimientoRou.delete('/mantenimientos/eliminar/:id', ADMIN, CN.deleteMantenimiento); // Eliminar un mantenimiento -- /panel/mantenimientos/eliminar/:id

export default panelMantenimientoRou;