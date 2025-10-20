/* SERVICIOS PARA VALIDAR DATOS DE MANTENIMIENTOS */
import {
  getMantenimientos, postMantenimiento, actualizarMantenimientoConConstancia, updateMantenimiento, deleteMantenimiento,
  SucursalExiste, comprobarFechaEstimada, comprobarFechaRealizada, ConstanciaExiste, comprobarSuMantenimiento, ecoSucursal, nextFEstimada, comprobarID
} from "../../models/Paneles/panelMantenimientoMod.js";

// Pedir los datos de los mantenimientos
export const obtenerMantenimientos = async (responsable, tipo) => {
  return await getMantenimientos(responsable, tipo);
};

// Agregar un nuevo mantenimiento
export const publicarMantenimiento = async (festimada, economico) => {
  if (!(await comprobarFechaEstimada(festimada))) { throw { code: 400, message: 'Fecha estimada menor a 01/Enero/2024' }; }
  if (!(await SucursalExiste(economico))) { throw { code: 404, message: 'No se encontro la sucursal (economico no valido)' }; }
  return await postMantenimiento(festimada, economico);
};

// Agregar constancia de mantenimiento
export const publicarConstancia = async ({ frealizada, descripcion, id, imagen, responsable }) => {
  if (!(await comprobarID(id))) throw { code: 404, message: 'No se encontró el ID' };
  if (!(await comprobarSuMantenimiento(id, responsable))) throw { code: 400, message: 'No es su mantenimiento' };
  if (!(await comprobarFechaRealizada(frealizada, id))) throw { code: 400, message: 'Fecha realizada menor a fecha estimada' };
  if (await ConstanciaExiste(id)) throw { code: 409, message: 'Ya tiene constancia' };

  const suSucursal = await ecoSucursal(id);
  const [yy] = frealizada.split('-');
  const siguiFEstimada = await nextFEstimada(frealizada);

  await actualizarMantenimientoConConstancia({ frealizada, descripcion, imagen, id, yy, siguiFEstimada, suSucursal });
};

// Actualizar un mantenimiento
export const actualizarMantenimiento = async (festimada, economico, id) => {
  if (!(await comprobarID(id))) { throw { code: 404, message: 'No se encontro el ID' }; }
  if (festimada.length !== 0) {
    if (!(await comprobarFechaEstimada(festimada))) { throw { code: 400, message: 'Fecha estimada menor a 01/Enero/2024' }; }
  }
  if (economico.length !== 0) {
    if (!(await SucursalExiste(economico))) { throw { code: 404, message: 'No se encontro la sucursal (economico no valido)' }; }
  }
  return await updateMantenimiento(festimada, economico, id);
};

// Eliminar un mantenimiento
export const eliminarMantenimiento = async (id) => {
  if (!(await comprobarID(id))) { throw { code: 404, message: 'No se encontro el ID' }; }
  return await deleteMantenimiento(id);
};