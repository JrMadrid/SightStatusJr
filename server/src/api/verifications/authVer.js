/* VERIFICACIONES SQL DE AUTENTICACIÓN DE USUARIOS */
import sql from 'mssql';

// Verificar que el usuario existe
const usuarioExiste = async (nickname) => {
  try {
    const query = 'SELECT nickname FROM users WHERE nickname = @nickname';
    const request = new sql.Request();
    request.input('nickname', sql.VarChar, nickname);
    const resultado = (await request.query(query)).recordset[0].nickname;
    return resultado;
  } catch (error) {
    console.error('Error: // Verificar que el usuario existe, ', error);
  }
};

// Verificar que el usuario esta activo
const comprobarActivo = async (nickname) => {
  try {
    const query = `SELECT activo FROM users WHERE nickname = @nickname`;
    const request = new sql.Request();
    request.input('nickname', sql.VarChar, nickname);
    const resultado = await request.query(query);
    return resultado.recordset[0].activo;
  } catch (error) {
    console.error('Error: // Verificar que el usuario esta activo, ', error);
  }
};

export const verificaciones = {
  usuarioExiste,
  comprobarActivo
};