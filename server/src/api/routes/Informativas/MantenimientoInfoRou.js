/* RUTAS DE INFORMATIVA -- MANTENIMIENTO */
import express from 'express';
import { controllers as CN } from '../../controllers/Informativas/MantenimientoInfoCon.js';
const MantenimientoInfoRou = express.Router();

MantenimientoInfoRou.get('/mantes/fechas/:economico', CN.getFechasRealizadas); // Mandar las fechas vinculadas al economico -- /informe/mantes/fechas/:economico
MantenimientoInfoRou.get('/mantes/tabla/seleccionado/:id', CN.getFechaSeleccionada); // Mandar el documento del mantenimiento seleccionado -- /informe/mantes/tabla/seleccionado/:id
MantenimientoInfoRou.get('/mantes/informativa/:fechasr', CN.getMantenimientoArchivo); // Mandar el archivo de la constancia de la fecha seleccionada -- /informe/mantes/informativa/:fechasr
MantenimientoInfoRou.get('/mantes/constancias/:economico', CN.getMantenimientosArchivos); // Mandar todas las constancias -- /informe/mantes/constancias/:economico

export default MantenimientoInfoRou;