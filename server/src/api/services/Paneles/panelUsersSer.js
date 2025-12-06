/* SERVICIOS PARA VALIDAR DATOS DE USUARIOS */
import bcrypt from 'bcryptjs'; // bcrypt para encriptar la contraseña
import { db as DB, verificaciones as VR } from '../../models/Paneles/panelUsersMod.js';

// Pedir los datos de los usuarios
const obtenerUsers = async () => {
  return await DB.getUsers();
};

// Agregar un nuevo usuario
const agregarUser = async ({ nickname, psw, tipo, activo }) => {
  psw = psw.trim();
  psw = await bcrypt.hash(psw, 12); // Encriptar la contraseña, el hash funciona como un algoritmo de encriptación que genera un hash de la contraseña, el 12 indica la complejidad del algoritmo
  let isAdmin = 0;
  if (tipo === 'Administrador') { isAdmin = 1; };
  let isActivo = 0;
  if (activo === 'si') { isActivo = 1; };
  if (await VR.NicknameOcupado(nickname)) { throw { code: 409, message: 'El Nickname definido ya existe en la base de datos.' }; };
  await DB.postUser({ nickname, psw, tipo, isAdmin, isActivo });
};

// Actualizar un usuario
const actualizarUser = async ({ nickname, psw, id, tipo, activo }) => {
  const SuperID = await VR.IDdelAdmin(id);
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  if (psw) {
    psw = psw.trim();
    psw = await bcrypt.hash(psw, 12); // Encriptar la contraseña
  };
  if (nickname) {
    if (await VR.NicknameOcupado(nickname)) { throw { code: 409, message: 'El Nickname definido ya existe en la base de datos.' }; };
  };
  if (tipo && SuperID) { throw { code: 403, message: 'No se puede modificar super administrador' }; };
  let isActivo;
  if (activo) {
    if (activo === 'no' && SuperID) { throw { code: 403, message: 'No se puede desactivar al super administrador' }; };
    isActivo = activo === 'si' ? 1 : 0;
  }
  await DB.updateUser({ nickname, psw, id, tipo, isActivo });
};

// Eliminar un usuario
const eliminarUser = async ({ id }, Super) => {
  if (!(await VR.comprobarID(id))) { throw { code: 404, message: 'No se encontró el ID' }; };
  if (await VR.IDdelAdmin(id)) { throw { code: 403, message: 'No se puede eliminar al super administrador' }; };
  const ingResponsable = await VR.nombreResponsable(id);
  await DB.deleteUser({ id }, ingResponsable, Super);
};

// Cerrar la sesión de todos los usuarios
const sacarAllUsers = async () => {
  await DB.logoutaAllUsers();
};

// Desactivar el acceso de todos los usuarios
const desactivarAllUsers = async () => {
  await DB.deactivateAllUsers();
};

// Activar el acceso de todos los usuarios
const activarAllUsers = async () => {
  await DB.activateAllUsers();
};

export const services = {
  obtenerUsers,
  agregarUser,
  actualizarUser,
  eliminarUser,
  sacarAllUsers,
  desactivarAllUsers,
  activarAllUsers
};