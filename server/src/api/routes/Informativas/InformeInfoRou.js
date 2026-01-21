/* RUTAS DE INFORMATIVA -- INFORMES */
import express from 'express';
import { controllers as CN } from '../../controllers/Informativas/InformeInfoCon.js';
const InformeInfoRou = express.Router();  

InformeInfoRou.get('/informes/info/:id', CN.informeinfo); // Mandar los datos del informe -- /api/informativa/informes/info/:id
InformeInfoRou.get('/informes/informe/:id', CN.informe); // Mandar el informe -- /api/informativa/informes/informe/:id

export default InformeInfoRou;