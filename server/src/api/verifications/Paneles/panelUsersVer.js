/* VERIFICACIONES SQL DE PANEL DE USUARIOS */
import sql from 'mssql';

// Evitar modificación del administrador 
const IDdelAdmin = async (id) => {
  return id === '1'; // ID del super admin
};

// Verificar que el nickname no está ocupado 
const NicknameOcupado = async (nickname) => {
  try {
    const query = 'SELECT nickname FROM users WHERE nickname = @nickname';
    const request = new sql.Request();
    request.input('nickname', sql.VarChar, nickname);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // Devuelve `true` si el nickname existe, `false` si no
  } catch (error) {
    console.error('Error: // Verificar que el nickname no está ocupado, ', error);
  }
};

// Verificar que ID del usuario existe para corrobar ejecución 
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM users WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // Devuelve `true` si el ID existe, `false` si no
  } catch (error) {
    console.error('Error: // Verificar que ID del usuario existe para corrobar ejecución, ', error);
  }
};

// Conocer el nombre del ing. Responsable por su id
const nombreResponsable = async (id) => {
  try {
    const query = 'SELECT nickname FROM users WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset[0].nickname;
  } catch (error) {
    console.error('Error: // Conocer el nombre del ing. Responsable por su id, ', error);
  }
};

export const verificaciones = {
  IDdelAdmin,
  NicknameOcupado,
  comprobarID,
  nombreResponsable
};