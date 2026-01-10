/* RUTAS DE PANEL DE INFORMES */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelInformeCon.js';
const panelInformeRou = express.Router();

panelInformeRou.get('/informes', CN.getInformes); // Pedir los datos de los informes -- /panel/informes
panelInformeRou.post('/informes', subir.PDF.single('informe'), CN.postInforme); // Agregar un nuevo informe -- /panel/informes
panelInformeRou.delete('/informes/:id', ADMIN, CN.deleteInforme); // Eliminar un informe -- /panel/informes/:id
panelInformeRou.get('/informe/:id', CN.Informe); // Pedir el informe en formato PDF -- /panel/informe/:id

export default panelInformeRou;