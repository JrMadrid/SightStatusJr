/* VALIDACIONES DE INFORMATIVA -- USUARIO */
import { verificaciones as VR } from "../../verifications/Informativas/UsuarioInfoVer.js";
import { operaciones as OP } from "../../repositories/Informativas/UsuarioInfoOpe.js";

// Pedir la lista de usuarios
const obtenerListaUsuarios = async () => {
  return await OP.getListaUsuarios();
};

// Pedir los datos del personal
const obtenerDatosSeleccionado = async (seleccionado) => {
  const existe = await VR.UsuarioExiste(seleccionado);
  if (!(existe)) { throw { code: 404, message: 'No se encontró el usuario' }; };
  return await OP.getDatosSeleccionado(seleccionado, existe);
};

// Pedir la foto del personal
const obtenerFotoSeleccionado = async (seleccionado) => {
  if (!(await VR.UsuarioExiste(seleccionado))) { throw { code: 404, message: 'No se encontró el usuario' }; };
  return await OP.getFotoSeleccionado(seleccionado);
};

// Editar los datos del personal
const editarDatosPersonal = async (value) => {
  const data = { ...value };
  const id = data.id;
  delete data.id;
  const [propiedadEditar, valor] = Object.entries(data)[0];
  await OP.editDataPersonal(propiedadEditar, valor, id);
};

// Editar la foto del personal
const editarFotoPersonal = async (foto, id) => {
  await OP.editFotoPersonal(foto, id);
};

export const validators = {
  obtenerListaUsuarios,
  obtenerDatosSeleccionado,
  obtenerFotoSeleccionado,
  editarDatosPersonal,
  editarFotoPersonal
};