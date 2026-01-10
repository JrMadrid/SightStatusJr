/* RUTAS DE PANEL DE SUCURSALES */
import express from 'express';
import { requireAdminSession as ADMIN } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelSucursalCon.js';
const panelSucursalRou = express.Router();

panelSucursalRou.get('/sucursales', CN.getSucursales); // Pedir los datos de las sucursales -- /panel/sucursales
panelSucursalRou.post('/sucursales', ADMIN, CN.postSucursal); // Agregar una nueva sucursal -- /panel/sucursales
panelSucursalRou.put('/sucursales/:id', ADMIN, CN.updateSucursal); // Actualizar una sucursal -- /panel/sucursales/:id
panelSucursalRou.delete('/sucursales/:id', ADMIN, CN.deleteSucursal); // Eliminar una sucursal -- /panel/sucursales/:id

export default panelSucursalRou;