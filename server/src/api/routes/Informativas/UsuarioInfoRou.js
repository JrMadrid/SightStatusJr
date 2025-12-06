/* RUTAS DE INFORMATIVA -- USUARIO */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Informativas/UsuarioInfoCon.js';
const UsuarioInfoRou = express.Router();  

UsuarioInfoRou.get('/personal/lista/nombres', ADMIN, CN.getListaUsuarios); // Pedir la lista de usuarios -- /informe/personal/lista/nombres
UsuarioInfoRou.get('/personal/datos/:nickname', CN.getDatosSeleccionado); // Pedir los datos del personal -- /informe/personal/datos/:nickname
UsuarioInfoRou.get('/personal/foto/:nickname', CN.getFotoSeleccionado); // Pedir la foto del personal -- /informe/personal/foto/:nickname
UsuarioInfoRou.put('/personal/editar/datos', CN.editDataPersonal); // Editar los datos del personal -- /informe/personal/editar/datos
UsuarioInfoRou.put('/personal/editar/foto', subir.Foto.single('foto'), CN.editFotoPersonal); // Editar la foto del personal -- /informe/personal/editar/foto

export default UsuarioInfoRou;