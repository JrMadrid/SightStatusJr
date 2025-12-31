/* VALIDACIONES DE PANEL DE DISPOSITIVOS */
import { verificaciones as VR } from "../../verifications/Paneles/panelDispositivosVer.js";
import { operaciones as OP } from "../../repositories/Paneles/panelDispositivosOpe.js";

// Pedir los datos de los dispositivos
const obtenerDatosDispositivos = async (responsable, tipo) => {
  return await OP.getDispositivos(responsable, tipo);
};

// Pedir la lista de los dispositivos
const obtenerListaDispositivos = async (responsable, tipo) => {
  return await OP.getListaDispositivos(responsable, tipo);
};

// Agregar un nuevo dispositivo
const agregarDispositivo = async ({ economico, ip, nombre, descripcion, general }) => {
  if (!(await VR.SucursalExiste(economico))) throw { code: 404, message: 'Sucursal no válida' };
  if (await VR.IpOcupada(ip)) throw { code: 406, message: 'IP ocupada' };
  await OP.postDispositivo({ economico, ip, nombre, descripcion, general });
};

// Actualizar un dispositivo
const actualizarDispositivo = async ({ id, economico, ip, nombre, descripcion, general, reiniciar }) => {
  if (!(await VR.comprobarID(id))) throw { code: 404, message: 'ID no válido' };
  if (economico) {
    if (!(await VR.SucursalExiste(economico))) throw { code: 404, message: 'Sucursal no válida' };
  };
  if (ip) {
    if (await VR.IpOcupada(ip)) throw { code: 409, message: 'IP ocupada' };
  };
  await OP.updateDispositivo({ id, economico, ip, nombre, descripcion, general, reiniciar });
};

// Eliminar un dispositivo
const eliminarDispositivo = async ({ id }) => {
  if (!(await VR.comprobarID(id))) throw { code: 404, message: 'ID no válido' };
  await OP.deleteDispositivo({ id });
};

export const validators = {
  obtenerDatosDispositivos,
  obtenerListaDispositivos,
  agregarDispositivo,
  actualizarDispositivo,
  eliminarDispositivo
};