/* MODEL PARA VALIDAR DATOS DE USUARIOS */
import sql from 'mssql';

// Pedir los datos de los usuarios
const getUsers = async () => {
  const request = new sql.Request();
  let result = await request.query('SELECT id, nickname, psw, tipo, activo FROM users');
  return result.recordset;
};

// Agregar un nuevo usuario
const postUser = async ({ nickname, psw, tipo, isAdmin, isActivo }) => {
  let transaction;
  try {
    transaction = new sql.Transaction();
    const requestCrear = new sql.Request(transaction);
    await transaction.begin();
    const query = 'INSERT INTO users (nickname, psw, isAdmin, tipo, activo) VALUES (@nickname, @psw, @isAdmin, @tipo, @isActivo)';
    requestCrear.input('nickname', sql.VarChar, nickname);
    requestCrear.input('psw', sql.VarChar, psw);
    requestCrear.input('isAdmin', sql.Bit, isAdmin);
    requestCrear.input('tipo', sql.VarChar, tipo);
    requestCrear.input('isActivo', sql.Bit, isActivo);
    await requestCrear.query(query);
    // Crear su respectivo elemento de personal
    await requestCrear.query(`INSERT INTO personal (nickname) VALUES ('${nickname}')`);
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción:', rollbackError);
      }
    }
    console.error('Error: ', error);
  }
};

// Actualizar un usuario
const updateUser = async ({ nickname, psw, id, tipo, isActivo }) => {
  let transaction;
  try {
    let isAdmin;
    const updates = [];
    // Si se ha modificado el nickname se debe recuperar el anterior para la consulta.
    let nick;
    if (nickname) {
      updates.push('nickname = @nickname');
      const idrequest = new sql.Request();
      nick = (await idrequest.query(`SELECT nickname FROM users WHERE id = ${id}`)).recordset[0].nickname;
    }
    if (psw) {
      psw = psw.trim();
      updates.push('psw = @psw');
    }
    if (tipo) {
      tipo === 'Administrador' ? isAdmin = 1 : isAdmin = 0;
      updates.push('tipo = @tipo');
      updates.push('isAdmin = @isAdmin');
    }
    if (isActivo !== undefined) {
      updates.push('activo = @isActivo');
    }
    if (updates.length === 0) {
      throw { code: 400, message: 'No hay datos para actualizar' };
    }
    transaction = new sql.Transaction();
    await transaction.begin();
    const requestActualizar = new sql.Request(transaction);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = @id`;
    requestActualizar.input('nickname', sql.VarChar, nickname);
    requestActualizar.input('psw', sql.VarChar, psw);
    requestActualizar.input('id', sql.Numeric, id);
    requestActualizar.input('isAdmin', sql.Bit, isAdmin);
    requestActualizar.input('tipo', sql.VarChar, tipo);
    requestActualizar.input('isActivo', sql.Bit, isActivo);

    await requestActualizar.query('ALTER TABLE sucursales NOCHECK CONSTRAINT FK_ingresponsable');
    await requestActualizar.query('ALTER TABLE personal NOCHECK CONSTRAINT FK_PersonalDetalles_Usuarios');
    await requestActualizar.query(query);
    if (nickname) {
      await requestActualizar.query(`UPDATE sucursales SET ingresponsable = @nickname FROM sucursales WHERE ingresponsable = '${nick}'`);
      await requestActualizar.query(`UPDATE personal SET nickname = @nickname FROM personal WHERE nickname = '${nick}'`);
    };
    await requestActualizar.query('ALTER TABLE personal CHECK CONSTRAINT FK_PersonalDetalles_Usuarios');
    await requestActualizar.query('ALTER TABLE sucursales CHECK CONSTRAINT FK_ingresponsable');
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción:', rollbackError);
      }
    }
    console.error('Error: ', error);
  }
};

// Eliminar un usuario
const deleteUser = async ({ id }, ingResponsable, Super) => {
  try {
    let transaction;
    transaction = new sql.Transaction();
    await transaction.begin();
    const requestEliminar = new sql.Request(transaction);
    requestEliminar.input('id', sql.Numeric, id);
    const query = 'DELETE FROM users WHERE id = @id';
    requestEliminar.input('ingResponsable', sql.VarChar, ingResponsable);

    await requestEliminar.query('ALTER TABLE sucursales NOCHECK CONSTRAINT FK_ingresponsable');
    await requestEliminar.query('ALTER TABLE personal NOCHECK CONSTRAINT FK_PersonalDetalles_Usuarios');
    await requestEliminar.query(`UPDATE sucursales SET ingresponsable = '${Super}' FROM sucursales WHERE ingresponsable = @ingResponsable`);
    await requestEliminar.query(`DELETE FROM personal WHERE nickname = @ingResponsable`);
    await requestEliminar.query(query);
    await requestEliminar.query('ALTER TABLE personal CHECK CONSTRAINT FK_PersonalDetalles_Usuarios');
    await requestEliminar.query('ALTER TABLE sucursales CHECK CONSTRAINT FK_ingresponsable');
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción:', rollbackError);
      }
    }
    console.error('Error: ', error);
  }
};

// Cerrar la sesión de todos los usuarios
const logoutaAllUsers = async () => {
  await sql.query(`DELETE FROM sessions WHERE data NOT LIKE '%"tipo":"Super Administrador"%'`);
};

// Desactivar el acceso de todos los usuarios
const deactivateAllUsers = async () => {
  await sql.query(`UPDATE users SET activo = 0 WHERE id <> 1`);
};

// Activar el acceso de todos los usuarios
const activateAllUsers = async () => {
  await sql.query(`UPDATE users SET activo = 1 WHERE id <> 1`);
};

/* Verificaciones */
// Evitar modificación del administrador 
const IDdelAdmin = async (id) => {
  return id === '1'; // ID del super admin
};

// Comprobar que el nickname no está ocupado 
const NicknameOcupado = async (nickname) => {
  try {
    const query = 'SELECT nickname FROM users WHERE nickname = @nickname';
    const request = new sql.Request();
    request.input('nickname', sql.VarChar, nickname);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // Devuelve `true` si el nickname existe, `false` si no
  } catch (error) {
    console.error('Error al comprobar el nickname:', error);
  }
};

// Comprobar que ID del usuario existe para corrobar ejecución 
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM users WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // Devuelve `true` si el ID existe, `false` si no
  } catch (error) {
    console.error('Error al comprobar el ID:', error);
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
    console.error('Error al conocer el nombre del ing. Responsable por su id', error);
  }
};

export const db = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  logoutaAllUsers,
  deactivateAllUsers,
  activateAllUsers
};

export const verificaciones = {
  IDdelAdmin,
  NicknameOcupado,
  comprobarID,
  nombreResponsable
};