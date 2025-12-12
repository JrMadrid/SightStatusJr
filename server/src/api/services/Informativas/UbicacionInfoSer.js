/* SERVICIOS DE INFORMATIVA -- UBICACIÓN */
import { db as DB, verificaciones as VR } from "../../models/Informativas/UbicacionInfoMod.js";

// Verificar el economico antes de cualquier consulta
const pedirVerificarEconomico = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (tipo === 'Geografia') {
    if (!(await VR.SucursalPerteneciente(economico, responsable))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  };
  const existe = await VR.UbicacionExiste(economico);
  if (!existe) {
    await DB.getVerificarEconomico(economico, existe);
  };
};

// Pedir los datos de la ubicación de la sucursal
const pedirUbicacionDatos = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (!(await VR.UbicacionExiste(economico))) { throw { code: 404, message: 'No se encontró la ubicación' }; };
  if (tipo === 'Geografia') {
    if (!(await VR.SucursalPerteneciente(economico, responsable))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  }
  return await DB.getUbicacionDatos(economico, responsable, tipo);
};

// Pedir la imagen de la ubicación de la sucursal
const pedirUbicacionFoto = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (!(await VR.UbicacionExiste(economico))) { throw { code: 404, message: 'No se encontró la ubicación' }; };
  if (tipo === 'Geografia') {
    if (!(await VR.SucursalPerteneciente(economico, responsable))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  }
  return await DB.getUbicacionFoto(economico, responsable, tipo);
};

// Editar los datos de la ubicación
const editarDatosUbicacion = async (value) => {
  const data = { ...value };
  const economico = data.economico;
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (!(await VR.UbicacionExiste(economico))) { throw { code: 404, message: 'No se encontró la ubicación' }; };
  delete data.economico;
  const [propiedadEditar, valor] = Object.entries(data)[0];
  return await DB.updateDatosUbicacion(propiedadEditar, valor, economico);
};

// Editar la imagen de la ubicación
const editarImagenUbicacion = async (imagen, economico) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (!(await VR.UbicacionExiste(economico))) { throw { code: 404, message: 'No se encontró la ubicación' }; };
  return await DB.updateImagenUbicacion(imagen, economico);
};

export const services = {
  pedirVerificarEconomico,
  pedirUbicacionDatos,
  pedirUbicacionFoto,
  editarDatosUbicacion,
  editarImagenUbicacion
};