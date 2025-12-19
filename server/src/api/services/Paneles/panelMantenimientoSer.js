/* SERVICIOS PARA VALIDAR DATOS DE MANTENIMIENTOS */
import { verificaciones as VR } from "../../rules/Paneles/panelMantenimientoVer.js";
import { operaciones as OP } from "../../repositories/Paneles/panelMantenimientoOpe.js";

// Pedir los datos de los mantenimientos
const obtenerMantenimientos = async (responsable, tipo) => {
  return await OP.getMantenimientos(responsable, tipo);
};

// Agregar un nuevo mantenimiento
const publicarMantenimiento = async ({ festimada, economico }) => {
  if (!(await VR.comprobarFechaEstimada(festimada))) { throw { code: 400, message: 'Fecha estimada menor a 01/Enero/2024' }; }
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; }
  return await OP.postMantenimiento({ festimada, economico });
};

// Agregar constancia de mantenimiento
const publicarConstancia = async ({ frealizada, descripcion, id }, { imagen, responsable }) => {
  if (!(await VR.comprobarID(id))) throw { code: 404, message: 'No se encontró el ID' };
  if (!(await VR.comprobarSuMantenimiento(id, responsable))) throw { code: 400, message: 'No es su mantenimiento' };
  if (!(await VR.comprobarFechaRealizada(frealizada, id))) throw { code: 400, message: 'Fecha realizada menor a fecha estimada' };
  if (await VR.ConstanciaExiste(id)) throw { code: 409, message: 'Ya tiene constancia' };
  const suSucursal = await VR.ecoSucursal(id);
  const yy = frealizada.getFullYear();
  const mm = frealizada.getMonth();
  const siguiFEstimada = await VR.nextFEstimada(yy, mm);
  await OP.actualizarMantenimientoConConstancia({ frealizada, descripcion, imagen, id, yy, siguiFEstimada, suSucursal });
};

// Actualizar un mantenimiento
const actualizarMantenimiento = async ({ festimada, economico, id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  if (festimada) {
    if (!(await VR.comprobarFechaEstimada(festimada))) { throw { code: 400, message: 'Fecha estimada menor a 01/Enero/2024' }; };
  };
  if (economico) {
    if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  };
  return await OP.updateMantenimiento({ festimada, economico, id });
};

// Eliminar un mantenimiento
const eliminarMantenimiento = async ({ id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  return await OP.deleteMantenimiento({ id });
};

export const services = {
  obtenerMantenimientos,
  publicarMantenimiento,
  publicarConstancia,
  actualizarMantenimiento,
  eliminarMantenimiento
};