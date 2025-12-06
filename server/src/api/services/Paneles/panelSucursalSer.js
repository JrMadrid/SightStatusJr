/* SERVICIOS PARA VALIDAR DATOS DE SUCURSALES */
import { db as DB, verificaciones as VR } from '../../models/Paneles/panelSucursalMod.js';

// Pedir los datos de las sucursales
const obtenerSucursales = async (responsable, tipo) => {
  return await DB.getSucursales(responsable, tipo);
};

// Agregar una nueva sucursal
const agregarSucursal = async ({ economico, canal, nombre, ingresponsable, rellenar }) => {
  if (await VR.EconomicoOcupado(economico)) { throw { code: 406, message: 'El Economico definido ya existe en la base de datos' }; };
  if (!(await VR.IngResponsable(ingresponsable))) { throw { code: 404, message: 'No se encontró el ing. Responsable' }; };
  await DB.postSucursal({ economico, canal, nombre, ingresponsable, rellenar });
};

// Actualizar una sucursal
const actualizarSucursal = async ({ economico, canal, nombre, id, ingresponsable, rellenar }) => {
  if (await VR.IDdelSinEstablecer(id)) { throw { code: 403, message: 'No se puede modificar la sucursal "Sin establecer"' }; };
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  if (economico) {
    if (await VR.EconomicoOcupado(economico)) { throw { code: 406, message: 'El Economico definido ya existe en la base de datos' }; };
  };
  if (ingresponsable) {
    if (!(await VR.IngResponsable(ingresponsable))) { throw { code: 404, message: 'No se encontró el ing. Responsable' }; };
  };
  await DB.updateSucursal({ economico, canal, nombre, id, ingresponsable, rellenar });
};

// Eliminar una sucursal
const eliminarSucursal = async ({ id }) => {
  if (await VR.IDdelSinEstablecer(id)) { throw { code: 403, message: 'No se puede eliminar la sucursal "Sin establecer"' }; };
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  await DB.deleteSucursal({ id });
};

export const services = {
  obtenerSucursales,
  agregarSucursal,
  actualizarSucursal,
  eliminarSucursal
};