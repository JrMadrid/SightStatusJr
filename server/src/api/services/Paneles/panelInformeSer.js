/* SERVICIOS PARA VALIDAR DATOS DE INFORMES */
import { db as DB, verificaciones as VR } from "../../models/Paneles/panelInformeMod.js";

// Pedir los datos de los informes
const obtenerInformes = async (tipo, responsable) => {
  return await DB.getInformes(tipo, responsable);
};

// Agregar un nuevo informe
const publicarInforme = async ({ descripcion, nombre, documento, frealizada, economico }, informe, ingeniero) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; }
  if (!(await VR.SucursalPerteneciente(economico, ingeniero))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  await DB.postInforme({ descripcion, nombre, documento, frealizada, economico }, informe);
};

// Eliminar un informe
const eliminarInforme = async ({ id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; }
  await DB.deleteInforme({ id });
};

// Pedir el informe en formato PDF
const archivoInforme = async (id) => {
  return await DB.informeArchivo(id);
};

export const services = {
  obtenerInformes,
  publicarInforme,
  eliminarInforme,
  archivoInforme
}