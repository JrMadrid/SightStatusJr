/* RUTAS DE INFORMATIVA -- MANUAL */
import express from 'express'
import { controllers as CN } from '../../controllers/Informativas/ManualInfoCon.js';
const ManualInfoRou = express.Router();  

ManualInfoRou.get('/manuales/info/:id', CN.manualinfo); // Mandar los datos del manual -- /api/informativa/manuales/info/:id
ManualInfoRou.get('/manuales/manual/:id', CN.manual); // Mandar el manual -- /api/informativa/manuales/manual/:id

export default ManualInfoRou;