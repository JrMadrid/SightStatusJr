/* RUTAS DE PANEL DE INFORMES */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelInformeCon.js';
const panelInformeRou = express.Router();

panelInformeRou.get('/informes', CN.getInformes); // Pedir los datos de los informes -- /api/panel/informes
panelInformeRou.post('/informes', subir.PDF.single('informe'), CN.postInforme); // Agregar un nuevo informe -- /api/panel/informes
panelInformeRou.delete('/informes/:id', ADMIN, CN.deleteInforme); // Eliminar un informe -- /api/panel/informes/:id
panelInformeRou.get('/informe/:id', CN.Informe); // Pedir el informe en formato PDF -- /api/panel/informe/:id

export default panelInformeRou;