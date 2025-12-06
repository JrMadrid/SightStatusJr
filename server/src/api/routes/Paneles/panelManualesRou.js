/* RUTAS DE PANEL DE MANUALES */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelManualesCon.js';
const panelManualesRou = express.Router();

panelManualesRou.get('/manuales', CN.getManuales); // Pedir los datos de los manuales -- /panel/manuales
panelManualesRou.post('/manuales/agregar', ADMIN, subir.PDF.single('manual'), CN.postManual); // Agregar un nuevo manual -- /panel/manuales/agregar
panelManualesRou.put('/manuales/actualizar/:id', ADMIN, CN.updateManual); // Actualizar un manual -- /panel/manuales/actualizar/:id
panelManualesRou.delete('/manuales/eliminar/:id', ADMIN, CN.deleteManual); // Eliminar un manual -- /panel/manuales/eliminar/:id
panelManualesRou.get('/manual/:id', CN.Manual); // Pedir el manual en formato PDF -- /panel/manual/:id

export default panelManualesRou;