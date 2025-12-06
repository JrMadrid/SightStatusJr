/* SERVICIOS DE AUTENTICACIÓN DE USUARIOS*/
import { db as DB, verificaciones as VR } from '../models/authMod.js';

// Leer y comprobar el usuario
const loginService = async ({ nickname, psw }) => {
  if (!(await VR.usuarioExiste(nickname))) { throw { code: 404, message: "El usuario no existe" } };
  if (!(await VR.comprobarActivo(nickname))) { throw { code: 403, message: "Su acceso es inválido" } };
  return await DB.comprobarUsuario({ nickname, psw });
};

// Definir el tipo de usuario
const definirTipoUsuario = async (session) => {
  const user = {
    username: session.user,
    isAdmin: session.admin,
    tipo: session.tipo,
    id: 0
  };
  if (session.admin == undefined) return user;
  if (session.admin === true) {
    user.id = (session.tipo === 'Super Administrador') ? 1 : 2;
  } else {
    user.id = (session.tipo === 'Aplicativo') ? 3 : 4;
  }
  return user;
};

export const services = {
  loginService,
  definirTipoUsuario
};