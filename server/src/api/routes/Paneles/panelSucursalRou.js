/* RUTAS DE PANEL DE SUCURSALES */
import express from 'express';
import { methods as panelSucursalCon } from '../../controllers/Paneles/panelSucursalCon.js';
import { requireUserSession, requireAdminSession } from '../../../middlewares/controllersmid.js';
const panelSucursalRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas

// Middleware
panelSucursalRou.use(express.urlencoded({ extended: true })); // Configura el middleware para analizar los datos de formulario URL-encoded
panelSucursalRou.get('/sucursales', requireUserSession, panelSucursalCon.getSucursales); // Pedir los datos de las sucursales -- /panel/sucursales
panelSucursalRou.post('/sucursales/agregar', requireAdminSession, panelSucursalCon.postSucursal); // Agregar una nueva sucursal -- /panel/sucursales/agregar
panelSucursalRou.post('/sucursales/actualizar', requireAdminSession, panelSucursalCon.updateSucursal); // Actualizar una sucursal -- /panel/sucursales/actualizar
panelSucursalRou.post('/sucursales/eliminar', requireAdminSession, panelSucursalCon.deleteSucursal); // Eliminar una sucursal -- /panel/sucursales/eliminar

export default panelSucursalRou;