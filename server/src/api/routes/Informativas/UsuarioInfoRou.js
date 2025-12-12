/* RUTAS DE INFORMATIVA -- USUARIO */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Informativas/UsuarioInfoCon.js';
const UsuarioInfoRou = express.Router();  

UsuarioInfoRou.get('/personal/lista/nombres', ADMIN, CN.getListaUsuarios); // Pedir la lista de usuarios -- /informativa/personal/lista/nombres
UsuarioInfoRou.get('/personal/datos/:nickname', CN.getDatosSeleccionado); // Pedir los datos del personal -- /informativa/personal/datos/:nickname
UsuarioInfoRou.get('/personal/foto/:nickname', CN.getFotoSeleccionado); // Pedir la foto del personal -- /informativa/personal/foto/:nickname
UsuarioInfoRou.put('/personal/editar/datos', CN.editDataPersonal); // Editar los datos del personal -- /informativa/personal/editar/datos
UsuarioInfoRou.put('/personal/editar/foto', subir.Foto.single('foto'), CN.editFotoPersonal); // Editar la foto del personal -- /informativa/personal/editar/foto

export default UsuarioInfoRou;