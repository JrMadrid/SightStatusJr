/* RUTAS DE INFORMATIVA -- MANUAL */
import express from 'express'
import { methods as ManualInfoControllers } from '../../controllers/Informativas/ManualInfoCon.js';
const ManualInfoRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas

ManualInfoRou.get('/manuales/info/:id', ManualInfoControllers.manualinfo); // Mandar los datos del manual -- /informe/manuales/info/:id
ManualInfoRou.get('/manuales/manual/:id', ManualInfoControllers.manual); // Mandar el manual -- /informe/manuales/manual/:id

export default ManualInfoRou;