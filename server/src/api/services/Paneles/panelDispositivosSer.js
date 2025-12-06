/* SERVICIOS PARA VALIDAR DATOS DE DISPOSITIVOS */
import { db as DB, verificaciones as VR } from '../../models/Paneles/panelDispositivosMod.js';

// Pedir los datos de los dispositivos
const obtenerDatosDispositivos = async (responsable, tipo) => {
  return await DB.getDispositivos(responsable, tipo);
};

// Pedir la lista de los dispositivos
const obtenerListaDispositivos = async (responsable, tipo) => {
  return await DB.getListaDispositivos(responsable, tipo);
};

// Agregar un nuevo dispositivo
const agregarDispositivo = async ({ economico, ip, nombre, descripcion, general }) => {
  if (!(await VR.SucursalExiste(economico))) throw { code: 404, message: 'Sucursal no válida' };
  if (await VR.IpOcupada(ip)) throw { code: 406, message: 'IP ocupada' };
  await DB.postDispositivo({ economico, ip, nombre, descripcion, general });
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
  await DB.updateDispositivo({ id, economico, ip, nombre, descripcion, general, reiniciar });
};

// Eliminar un dispositivo
const eliminarDispositivo = async ({ id }) => {
  if (!(await VR.comprobarID(id))) throw { code: 404, message: 'ID no válido' };
  await DB.deleteDispositivo({ id });
};

export const services = {
  obtenerDatosDispositivos,
  obtenerListaDispositivos,
  agregarDispositivo,
  actualizarDispositivo,
  eliminarDispositivo
};