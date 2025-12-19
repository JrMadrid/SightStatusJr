/* SERVICIOS DE INFORMATIVA -- MANUAL */
import { operaciones as OP } from "../../repositories/Informativas/ManualInfoOpe.js";

// Mandar los datos del manual
const obtenerDatosManual = async (manualid) => {
  return await OP.getDatosManual(manualid);
};

// Mandar el manual
const obtenerArchivoManual = async (manualid) => {
  return await OP.getManualArchivo(manualid);
};

export const services = {
  obtenerDatosManual,
  obtenerArchivoManual
};