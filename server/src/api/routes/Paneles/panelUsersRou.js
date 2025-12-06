/* RUTAS DE PANEL DE USUARIOS */
import express from 'express';
import { requireAdminSession as ADMIN } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelUsersCon.js';
const panelUserRou = express.Router();

panelUserRou.get('/users', ADMIN, CN.getUsers); // Pedir los datos de los usuarios -- /panel/users
panelUserRou.post('/users/agregar', ADMIN, CN.postUser); // Agregar un nuevo usuario -- /panel/users/agregar
panelUserRou.put('/users/actualizar/:id', ADMIN, CN.updateUser); // Actualizar un usuario -- /panel/users/actualizar/:id
panelUserRou.delete('/users/eliminar/:id', ADMIN, CN.deleteUser); // Eliminar un usuario -- /panel/users/eliminar/:id
panelUserRou.get('/users/logoutall', ADMIN, CN.logoutaAllUsers); // Cerrar la sesion de todos los usuarios -- /panel/users/logoutall
panelUserRou.get('/users/deactivateall', ADMIN, CN.deactivateAllUsers); // Desactivar el acceso de todos los usuarios -- /panel/users/deactivateall
panelUserRou.get('/users/activateall', ADMIN, CN.activateAllUsers); // Activar el acceso de todos los usuarios -- /panel/users/activateall

export default panelUserRou;