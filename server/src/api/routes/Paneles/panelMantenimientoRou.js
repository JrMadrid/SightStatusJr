/* RUTAS DE PANEL DE MANTENIMIENTOS */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelMantenimientoCon.js';
const panelMantenimientoRou = express.Router();

panelMantenimientoRou.get('/mantenimientos', CN.getMantenimientos); // Pedir los datos de los mantenimientos -- /api/panel/mantenimientos
panelMantenimientoRou.post('/mantenimientos', ADMIN, CN.postMantenimiento); // Agregar un nuevo mantenimiento -- /api/panel/mantenimientos
panelMantenimientoRou.post('/mantenimientos/constancia', subir.Foto.single('imagen'), CN.postConstancia); // Agregar constancia de mantenimiento -- /api/panel/mantenimientos/constancia
panelMantenimientoRou.put('/mantenimientos/:id', ADMIN, CN.updateMantenimiento); // Actualizar un mantenimiento -- /api/panel/mantenimientos/:id
panelMantenimientoRou.delete('/mantenimientos/:id', ADMIN, CN.deleteMantenimiento); // Eliminar un mantenimiento -- /api/panel/mantenimientos/:id

export default panelMantenimientoRou;