/* RUTAS DE PANEL DE DISPOSITIVOS */
import express from 'express';
import { requireAdminSession as ADMIN } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelDispositivosCon.js';
const panelDispositivosRou = express.Router();  

panelDispositivosRou.get('/dispositivos', CN.getDatosDispositivos); // Pedir los datos de los dispositivos -- /panel/dispositivos
panelDispositivosRou.get('/dispositivos/lista', CN.getListaDispositivos); // Pedir la lista de los dispositivos -- /panel/dispositivos/lista
panelDispositivosRou.post('/dispositivos/agregar', ADMIN, CN.postDispositivo); // Agregar un nuevo dispositivo -- /panel/dispositivos/agregar
panelDispositivosRou.put('/dispositivos/actualizar/:id', ADMIN, CN.updateDispositivo); // Actualizar un dispositivo -- /panel/dispositivos/actualizar/:id
panelDispositivosRou.delete('/dispositivos/eliminar/:id', ADMIN, CN.deleteDispositivo); // Eliminar un dispositivo -- /panel/dispositivos/eliminar/:id
panelDispositivosRou.get('/dispositivos/ping/:ip', ADMIN, CN.ping); // Hacer ping a la ip -- /panel/dispositivos/ping/:ip

export default panelDispositivosRou;