/* SERVICIOS DE INFORMATIVA -- INFORMES */
import { db as DB } from '../../models/Informativas/InformeInfoMod.js';

// Mandar los datos del informe
const obtenerInfoInforme = async (id) => {
  return await DB.getInformeNombreDescripcion(id);
};

// Mandar el informe
const obtenerArchivoInforme = async (id) => {
  return await DB.getInformeArchivo(id);
};

export const services = {
  obtenerInfoInforme,
  obtenerArchivoInforme
};