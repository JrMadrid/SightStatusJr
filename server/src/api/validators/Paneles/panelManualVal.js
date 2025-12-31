/* VALIDACIONES DE PANEL DE MANUALES */
import { verificaciones as VR } from "../../verifications/Paneles/panelManualVer.js";
import { operaciones as OP } from "../../repositories/Paneles/panelManualOpe.js";

// Pedir los datos de los manuales
const obtenerManuales = async () => {
  return await OP.getManuales();
};

// Agregar un nuevo manual
const publicarManual = async ({ descripcion, nombre, documento }, manual) => {
  return await OP.postManuales({ descripcion, nombre, documento }, manual);
};

// Actualizar un manual
const actualizarManual = async ({ nombre, descripcion, id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  await OP.updateManual({ nombre, descripcion, id });
};

// Eliminar un manual
const eliminarManual = async ({ id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  await OP.deleteManual({ id });
};

// Pedir el manual en formato PDF
const manualArchivo = async (id) => {
  return await OP.Manual(id);
};

export const validators = {
  obtenerManuales,
  publicarManual,
  eliminarManual,
  actualizarManual,
  manualArchivo
}