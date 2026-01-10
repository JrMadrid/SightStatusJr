/* RUTAS DE PANEL DE MANUALES */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelManualesCon.js';
const panelManualesRou = express.Router();

panelManualesRou.get('/manuales', CN.getManuales); // Pedir los datos de los manuales -- /panel/manuales
panelManualesRou.post('/manuales', ADMIN, subir.PDF.single('manual'), CN.postManual); // Agregar un nuevo manual -- /panel/manuales
panelManualesRou.put('/manuales/:id', ADMIN, CN.updateManual); // Actualizar un manual -- /panel/manuales/:id
panelManualesRou.delete('/manuales/:id', ADMIN, CN.deleteManual); // Eliminar un manual -- /panel/manuales/:id
panelManualesRou.get('/manual/:id', CN.Manual); // Pedir el manual en formato PDF -- /panel/manual/:id

export default panelManualesRou;