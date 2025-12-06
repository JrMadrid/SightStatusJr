/* SERIVICOS PARA VALIDAR DATOS DE MANUALES */
import { db as DB, verificaciones as VR } from "../../models/Paneles/panelManualMod.js";

// Pedir los datos de los manuales
const obtenerManuales = async () => {
  return await DB.getManuales();
};

// Agregar un nuevo manual
const publicarManual = async ({ descripcion, nombre, documento }, manual) => {
  return await DB.postManuales({ descripcion, nombre, documento }, manual);
};

// Actualizar un manual
const actualizarManual = async ({ nombre, descripcion, id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  await DB.updateManual({ nombre, descripcion, id });
};

// Eliminar un manual
const eliminarManual = async ({ id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  await DB.deleteManual({ id });
};

// Pedir el manual en formato PDF
const manualArchivo = async (id) => {
  return await DB.Manual(id);
};

export const services = {
  obtenerManuales,
  publicarManual,
  eliminarManual,
  actualizarManual,
  manualArchivo
}