/* SERVICIOS PARA VALIDAR DATOS DE DISPOSITIVOS */
import { getDispositivos, getListaDispositivos, postDispositivo, updateDispositivo, deleteDispositivo, SucursalExiste, IpOcupada, comprobarID } from '../../models/Paneles/panelDispositivosMod.js';

// Pedir los datos de los dispositivos
export const obtenerDatosDispositivos = async (responsable, tipo) => {
  return await getDispositivos(responsable, tipo);
};

// Pedir la lista de los dispositivos
export const obtenerListaDispositivos = async (responsable, tipo) => {
  return await getListaDispositivos(responsable, tipo);
};

// Agregar un nuevo dispositivo
export async function agregarDispositivo(economico, ip, nombre, descripcion, general) {
  await SucursalExiste(economico);
  if (!(await SucursalExiste(economico))) throw { code: 404, message: 'Sucursal no válida' };
  if (await IpOcupada(ip)) throw { code: 406, message: 'IP ocupada' };

  await postDispositivo(economico, ip, nombre, descripcion, general);
};

// Actualizar un dispositivo
export async function actualizarDispositivo(economico, ip, nombre, id, descripcion, general, reiniciar) {
  if (!(await comprobarID(id))) throw { code: 404, message: 'ID no válido' };
  if (economico?.length) {
    if (!(await SucursalExiste(economico))) throw { code: 404, message: 'Sucursal no válida' };
  }
  if (ip?.length) {
    if (await IpOcupada(ip)) throw { code: 409, message: 'IP ocupada' };
  }

  await updateDispositivo(economico, ip, nombre, id, descripcion, general, reiniciar);
};

// Eliminar un dispositivo
export async function eliminarDispositivo(id) {
  if (!(await comprobarID(id))) throw { code: 404, message: 'ID no válido' };

  await deleteDispositivo(id);
};