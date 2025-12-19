/* SERVICIOS DE INFORMATIVA -- DISPOSITIVOS */
import { verificaciones as VR } from "../../rules/Informativas/DispositivosInfoVer.js";
import { operaciones as OP } from "../../repositories/Informativas/DispositivosInfoOpe.js";

// Mandar los dispositivos con ese nombre
const dispositivosNombre = async (dispositivo, responsable, tipo) => {
  if (!(await VR.dipositivoExiste(dispositivo))) { throw { code: 404, message: 'No se encontró el dispositivo (nombre no válido)' }; };
  return await OP.obtenerDispositivosNombre(dispositivo, responsable, tipo);
};

// Pedir los datos de los dispositivos
const infoDispositivo = async (dispositivo, responsable, tipo) => {
  return await OP.obtenerInfoDispositivos(dispositivo, responsable, tipo);
};

export const services = {
  dispositivosNombre,
  infoDispositivo
};