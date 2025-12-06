/* RUTAS DE INFORMATIVA -- SUCURSAL */
import express from 'express';
import { controllers as CN } from '../../controllers/Informativas/SucursalInfoCon.js';
const SucursalInfoRou = express.Router();  

SucursalInfoRou.get('/status/numero/:economico', CN.getSucursalDispositivos); // Consultar y retornar los dispositivos registrados por número económico -- /informe/status/numero/:economico
SucursalInfoRou.get('/status/aplicacion/:ip', CN.info); // Obtener la información general de un dispositivo en específico por su IP -- /informe/status/aplicacion/:ip
SucursalInfoRou.get('/status/dispositivos/:economico', CN.dispositivos); // Recorrer los dispositivos de una sucursal y actualizar la información si es necesario -- /informe/status/dispositivos/:economico
SucursalInfoRou.post('/status/aplicacion/solicitud', CN.solicitudes); // Enviar solicitudes o comandos al biométrico -- /informe/status/aplicacion/solicitud

export default SucursalInfoRou;