/* RUTAS DE INFORMATIVA -- UBICACIÓN */
import express from 'express';
import { requireAdminSession as ADMIN, subir } from '../../../middlewares/controllersMid.js';
import { controllers as CN } from '../../controllers/Informativas/UbicacionInfoCon.js';
const UbicacionInfoRou = express.Router();  

UbicacionInfoRou.get('/ubicacion/verificar/:economico', CN.getVerificarEconomico); // Verificar el economico antes de cualquier consulta -- /informativa/ubicacion/verificar/:economico
UbicacionInfoRou.get('/ubicacion/datos/:economico', CN.getUbicacionDatos); // Pedir los datos de la ubicación de la sucursal -- /informativa/ubicacion/datos/:economico
UbicacionInfoRou.get('/ubicacion/imagen/:economico', CN.getUbicacionFoto); // Pedir la imagen de la ubicación de la sucursal -- /informativa/ubicacion/imagen/:economico
UbicacionInfoRou.put('/ubicacion/editar/datos', ADMIN, CN.updateDatosUbicacion); // Editar los datos de la ubicación -- /informativa/ubicacion/datos/editar
UbicacionInfoRou.put('/ubicacion/editar/imagen', ADMIN, subir.Foto.single('imagen'), CN.updateImagenUbicacion); // Editar la imagen de la ubicación -- /informativa/ubicacion/datos/imagen

export default UbicacionInfoRou;