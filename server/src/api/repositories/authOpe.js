/* OPERACIONES SQL DE AUTENTICACIÓN DE USUARIOS */
import bcrypt from 'bcryptjs'; // Encriptar datos
import sql from 'mssql';

// Leer y comprobar el usuario
const comprobarUsuario = async ({ nickname, psw }) => {
  const query = 'SELECT nickname, psw, isAdmin, tipo FROM users WHERE nickname = @nickname';
  const request = new sql.Request();
  request.input('nickname', sql.VarChar, nickname);
  const resultado = await request.query(query);
  const usuario = resultado.recordset[0].nickname;
  const admon = resultado.recordset[0].isAdmin;
  const tipo = resultado.recordset[0].tipo;
  const hashAlmacenado = resultado.recordset[0].psw;
  const valid = await new Promise((resolve, reject) => {
    bcrypt.compare(psw.trim(), hashAlmacenado, (error, valid) => {
      if (error) {
        reject(error); // Rechaza la Promesa con el error
      } else {
        resolve(valid); // Resuelve la Promesa con el resultado de la comparación
      }
    });
  });
  if (valid) {
    return { usuario, admon, tipo }; // Retorna el usuario y el estado de administrador
  } else {
    throw { code: 401, message: "La contraseñas es incorrecta" };
  }
};

export const operaciones = {
  comprobarUsuario
};