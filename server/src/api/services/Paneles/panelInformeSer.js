/* SERVICIOS PARA VALIDAR DATOS DE INFORMES */
import { verificaciones as VR } from "../../rules/Paneles/panelInformeVer.js";
import { operaciones as OP } from "../../repositories/Paneles/panelInformeOpe.js";

// Pedir los datos de los informes
const obtenerInformes = async (tipo, responsable) => {
  return await OP.getInformes(tipo, responsable);
};

// Agregar un nuevo informe
const publicarInforme = async ({ descripcion, nombre, documento, frealizada, economico }, informe, ingeniero) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; }
  if (!(await VR.SucursalPerteneciente(economico, ingeniero))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  await OP.postInforme({ descripcion, nombre, documento, frealizada, economico }, informe);
};

// Eliminar un informe
const eliminarInforme = async ({ id }) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; }
  await OP.deleteInforme({ id });
};

// Pedir el informe en formato PDF
const archivoInforme = async (id) => {
  return await OP.informeArchivo(id);
};

export const services = {
  obtenerInformes,
  publicarInforme,
  eliminarInforme,
  archivoInforme
}