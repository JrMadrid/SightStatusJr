/* SERVICIOS DE INFORMATIVA -- SUCURSAL */
import { verificaciones as VR } from "../../rules/Informativas/SucursalInfoVer.js";
import { operaciones as OP } from "../../repositories/Informativas/SucursalInfoOpe.js";

// Consultar y retornar los dispositivos registrados por número económico
const DatosDispositivos = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (tipo === 'Geografia') {
    if (!(await VR.SucursalPerteneciente(economico, responsable))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  };
  return await OP.getDatosDispositivos(economico, responsable, tipo);
};

// Obtener la información general de un dispositivo en específico por su IP
const nombreDispositivoXIP = async (ip) => {
  return await OP.dispositivoIP(ip);
};

// Consultar información general y de la sucursal del dispositivo
const informationGneralDispositivo = async (ip) => {
  return await OP.infoGeneralDispositivo(ip);
};

// Consultar todos los dispositivos válidos de la sucursal
const dispositiosválidos = async (economico) => {
  return await OP.dispositivosSucursal(economico)
};

// Actualizar el campo "general" en la base de datos
const actualizarInformacionGeneral = async (general, ip) => {
  await OP.actualizarGeneral(general, ip);
};

// Actualizar el campo "descripcion" en la base de datos
const actualizarInformacionDescripcion = async (descripcion, ip) => {
  await OP.actualizarDescripcion(descripcion, ip);
};

export const services = {
  DatosDispositivos,
  nombreDispositivoXIP,
  informationGneralDispositivo,
  dispositiosválidos,
  actualizarInformacionGeneral,
  actualizarInformacionDescripcion
};