/* SERVICIOS DE INFORMATIVA -- MANUAL */
import { db as DB } from "../../models/Informativas/ManualInfoMod.js";

// Mandar los datos del manual
const obtenerDatosManual = async (manualid) => {
  return await DB.getDatosManual(manualid);
};

// Mandar el manual
const obtenerArchivoManual = async (manualid) => {
  return await DB.getManualArchivo(manualid);
};

export const services = {
  obtenerDatosManual,
  obtenerArchivoManual
};