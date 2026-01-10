/* RUTAS DE PANEL DE USUARIOS */
import express from 'express';
import { requireAdminSession as ADMIN } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Paneles/panelUsersCon.js';
const panelUserRou = express.Router();

panelUserRou.get('/users', ADMIN, CN.getUsers); // Pedir los datos de los usuarios -- /panel/users
panelUserRou.post('/users', ADMIN, CN.postUser); // Agregar un nuevo usuario -- /panel/users
panelUserRou.put('/users/:id', ADMIN, CN.updateUser); // Actualizar un usuario -- /panel/users/:id
panelUserRou.delete('/users/:id', ADMIN, CN.deleteUser); // Eliminar un usuario -- /panel/users/:id
panelUserRou.post('/users/logoutall', ADMIN, CN.logoutaAllUsers); // Cerrar la sesion de todos los usuarios -- /panel/users/logoutall
panelUserRou.post('/users/deactivateall', ADMIN, CN.deactivateAllUsers); // Desactivar el acceso de todos los usuarios -- /panel/users/deactivateall
panelUserRou.post('/users/activateall', ADMIN, CN.activateAllUsers); // Activar el acceso de todos los usuarios -- /panel/users/activateall

export default panelUserRou;