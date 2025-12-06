/* RUTAS DE PANEL DE SUCURSALES */
import express from 'express';
import { requireAdminSession as ADMIN } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelSucursalCon.js';
const panelSucursalRou = express.Router();

panelSucursalRou.get('/sucursales', CN.getSucursales); // Pedir los datos de las sucursales -- /panel/sucursales
panelSucursalRou.post('/sucursales/agregar', ADMIN, CN.postSucursal); // Agregar una nueva sucursal -- /panel/sucursales/agregar
panelSucursalRou.put('/sucursales/actualizar/:id', ADMIN, CN.updateSucursal); // Actualizar una sucursal -- /panel/sucursales/actualizar/:id
panelSucursalRou.delete('/sucursales/eliminar/:id', ADMIN, CN.deleteSucursal); // Eliminar una sucursal -- /panel/sucursales/eliminar/:id

export default panelSucursalRou;