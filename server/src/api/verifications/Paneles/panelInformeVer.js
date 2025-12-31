/* VERIFICACIONES SQL DE PANEL DE DE INFORMES */
import sql from 'mssql';

// Verificar que existe la sucursal antes de cualquier operación con los informes
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error al comprobar la sucursal:', error);
  }
};

// Verificar que la sucursal le pertenezca a ese usuario
const SucursalPerteneciente = async (economico, ingeniero) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico AND ingresponsable = @usuario';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    request.input('usuario', sql.NVarChar, ingeniero);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error al comprobar la sucursal:', error);
  }
};

// Verificar que ID del informe existe para corrobar ejecución
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM informes WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

export const verificaciones = {
  SucursalExiste,
  SucursalPerteneciente,
  comprobarID
};