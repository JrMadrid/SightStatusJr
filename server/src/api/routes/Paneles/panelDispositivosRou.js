/* RUTAS DE PANEL DE DISPOSITIVOS */
import express from 'express';
import { methods as panelDispositivosCon } from '../../controllers/Paneles/panelDispositivosCon.js';
import { requireUserSession, requireAdminSession } from '../../../middlewares/controllersmid.js';
const panelDispositivosRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas

// Middleware
panelDispositivosRou.use(express.urlencoded({ extended: true })); // Configura el middleware para analizar los datos de formulario URL-encoded

panelDispositivosRou.get('/dispositivos', requireUserSession, panelDispositivosCon.getDatosDispositivos); // Pedir los datos de los dispositivos -- /panel/dispositivos
panelDispositivosRou.get('/dispositivos/lista', requireUserSession, panelDispositivosCon.getListaDispositivos); // Pedir la lista de los dispositivos -- /panel/dispositivos/lista
panelDispositivosRou.post('/dispositivos/agregar', requireAdminSession, panelDispositivosCon.postDispositivo); // Agregar un nuevo dispositivo -- /panel/dispositivos/agregar
panelDispositivosRou.post('/dispositivos/actualizar', requireAdminSession, panelDispositivosCon.updateDispositivo); // Actualizar un dispositivo -- /panel/dispositivos/actualizar
panelDispositivosRou.post('/dispositivos/eliminar', requireAdminSession, panelDispositivosCon.deleteDispositivo); // Eliminar un dispositivo -- /panel/dispositivos/eliminar
panelDispositivosRou.get('/ping/:ip', requireAdminSession, panelDispositivosCon.ping); // Hacer ping a la ip -- /panel/ping/:ip

export default panelDispositivosRou;