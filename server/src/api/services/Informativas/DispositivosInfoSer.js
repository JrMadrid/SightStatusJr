/* SERVICIOS DE INFORMATIVA -- DISPOSITIVOS */
import { db as DB, verificaciones as VR } from '../../models/Informativas/DispositivosInfoMod.js';

// Mandar los dispositivos con ese nombre
const dispositivosNombre = async (dispositivo, responsable, tipo) => {
  if (!(await VR.dipositivoExiste(dispositivo))) { throw { code: 404, message: 'No se encontró el dispositivo (nombre no válido)' }; };
  return await DB.obtenerDispositivosNombre(dispositivo, responsable, tipo);
};

// Pedir los datos de los dispositivos
const infoDispositivo = async (dispositivo, responsable, tipo) => {
  return await DB.obtenerInfoDispositivos(dispositivo, responsable, tipo);
};

export const services = {
  dispositivosNombre,
  infoDispositivo
};