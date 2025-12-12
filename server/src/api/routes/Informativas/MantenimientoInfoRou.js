/* RUTAS DE INFORMATIVA -- MANTENIMIENTO */
import express from 'express';
import { controllers as CN } from '../../controllers/Informativas/MantenimientoInfoCon.js';
const MantenimientoInfoRou = express.Router();

MantenimientoInfoRou.get('/mantenimientos/fechas/:economico', CN.getFechasRealizadas); // Mandar las fechas vinculadas al economico -- /informativa/mantenimientos/fechas/:economico
MantenimientoInfoRou.get('/mantenimientos/tabla/seleccionado/:id', CN.getFechaSeleccionada); // Mandar el documento del mantenimiento seleccionado -- /informativa/mantenimientos/tabla/seleccionado/:id
MantenimientoInfoRou.get('/mantenimientos/informativa/:fechasr', CN.getMantenimientoArchivo); // Mandar el archivo de la constancia de la fecha seleccionada -- /informativa/mantenimientos/informativa/:fechasr
MantenimientoInfoRou.get('/mantenimientos/constancias/:economico', CN.getMantenimientosArchivos); // Mandar todas las constancias -- /informativa/mantenimientos/constancias/:economico

export default MantenimientoInfoRou;