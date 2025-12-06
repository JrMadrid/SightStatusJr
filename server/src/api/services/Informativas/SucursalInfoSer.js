/* SERVICIOS DE INFORMATIVA -- SUCURSAL */
import { db as DB, verificaciones as VR } from "../../models/Informativas/SucursalInfoMod.js";

// Consultar y retornar los dispositivos registrados por número económico
const DatosDispositivos = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  return await DB.getDatosDispositivos(economico, responsable, tipo);
};

// Obtener la información general de un dispositivo en específico por su IP
const nombreDispositivoXIP = async (ip) => {
  return await DB.dispositivoIP(ip);
};

// Consultar información general y de la sucursal del dispositivo
const informationGneralDispositivo = async (ip) => {
  return await DB.infoGeneralDispositivo(ip);
};

// Consultar todos los dispositivos válidos de la sucursal
const dispositiosválidos = async (economico) => {
  return await DB.dispositivosSucursal(economico)
};

// Actualizar el campo "general" en la base de datos
const actualizarInformacionGeneral = async (general, ip) => {
  await DB.actualizarGeneral(general, ip);
};

// Actualizar el campo "descripcion" en la base de datos
const actualizarInformacionDescripcion = async (descripcion, ip) => {
  await DB.actualizarDescripcion(descripcion, ip);
};

export const services = {
  DatosDispositivos,
  nombreDispositivoXIP,
  informationGneralDispositivo,
  dispositiosválidos,
  actualizarInformacionGeneral,
  actualizarInformacionDescripcion
};