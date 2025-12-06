/* RUTAS DE INFORMATIVA -- DISPOSITIVOS */
import express from 'express';
import { controllers as CN } from '../../controllers/Informativas/DispositivosInfoCon.js';
const DeviceInfoRou = express.Router();

DeviceInfoRou.get('/devices/dispositivos/:nombre', CN.getDispositivosNombre); // Mandar los dispositivos con ese nombre -- /informe/devices/dispositivos/:nombre
DeviceInfoRou.get('/devices/device/:nombre', CN.getInfoDispositivos); // Pedir los datos de los dispositivos -- /informe/devices/device/:nombre

export default DeviceInfoRou;