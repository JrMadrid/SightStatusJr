/* VALIDACIONES DE INFORMATIVA -- INFORMES */
import { operaciones as OP } from "../../repositories/Informativas/InformeInfoOpe.js";

// Mandar los datos del informe
const obtenerInfoInforme = async (id) => {
  return await OP.getInformeNombreDescripcion(id);
};

// Mandar el informe
const obtenerArchivoInforme = async (id) => {
  return await OP.getInformeArchivo(id);
};

export const validators = {
  obtenerInfoInforme,
  obtenerArchivoInforme
};