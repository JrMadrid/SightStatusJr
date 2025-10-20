/* RUTAS DE INFORMATIVA -- INFORMES */
import express from 'express';
import { methods as InformeInfoControllers } from '../../controllers/Informativas/InformeInfoCon.js';
const InformeInfoRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas

InformeInfoRou.get('/informes/info/:id', InformeInfoControllers.informeinfo); // Mandar los datos del informe -- /informe/informes/info/:id
InformeInfoRou.get('/informes/informe/:id', InformeInfoControllers.informe); // Mandar el informe -- /informe/informes/informe/:id

export default InformeInfoRou;