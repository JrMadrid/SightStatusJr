/* RUTAS DE INFORMATIVA -- MANTENIMIENTO */
import express from 'express';
import ManteInfoControllers from '../../controllers/Informativas/ManteInfoCon.js';
const ManteInfoRou = express.Router(); // Crea un nuevo objeto Router que se puede usar para definir rutas

ManteInfoRou.get('/mantes/fechas/:economico', ManteInfoControllers.fechasr); // Mandar las fechas vinculadas al economico -- /informe/mantes/fechas/:economico
ManteInfoRou.get('/mantes/tabla/seleccionado/:id', ManteInfoControllers.mantenimientoSeleccionado); // Mandar el documento del mantenimiento seleccionado -- /informe/mantes/tabla/seleccionado/:id
ManteInfoRou.get('/mantes/informativa/:fechasr', ManteInfoControllers.info); // Mandar el archivo de la constancia de la fecha seleccionada -- /informe/mantes/informativa/:fechasr
ManteInfoRou.get('/mantes/constancias/:economico', ManteInfoControllers.infos); // Mandar todas las constancias -- /informe/mantes/constancias/:economico

export default ManteInfoRou;