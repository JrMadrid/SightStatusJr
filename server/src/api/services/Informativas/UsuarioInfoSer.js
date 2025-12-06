/* SERVICIOS DE INFORMATIVA -- USUARIO */
import { db as DB, verificaciones as VR } from "../../models/Informativas/UsuarioInfoMod.js";

// Pedir la lista de usuarios
const obtenerListaUsuarios = async () => {
  return await DB.getListaUsuarios();
};

// Pedir los datos del personal
const obtenerDatosSeleccionado = async (seleccionado) => {
  const existe = await VR.UsuarioExiste(seleccionado);
  if (!(existe)) { throw { code: 404, message: 'No se encontró el usuario' }; };
  return await DB.getDatosSeleccionado(seleccionado, existe);
};

// Pedir la foto del personal
const obtenerFotoSeleccionado = async (seleccionado) => {
  if (!(await VR.UsuarioExiste(seleccionado))) { throw { code: 404, message: 'No se encontró el usuario' }; };
  return await DB.getFotoSeleccionado(seleccionado);
};

// Editar los datos del personal
const editarDatosPersonal = async (value) => {
  const data = { ...value };
  const id = data.id;
  delete data.id;
  const [propiedadEditar, valor] = Object.entries(data)[0];
  await DB.editDataPersonal(propiedadEditar, valor, id);
};

// Editar la foto del personal
const editarFotoPersonal = async (foto, id) => {
  await DB.editFotoPersonal(foto, id);
};

export const services = {
  obtenerListaUsuarios,
  obtenerDatosSeleccionado,
  obtenerFotoSeleccionado,
  editarDatosPersonal,
  editarFotoPersonal
};