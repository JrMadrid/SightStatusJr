/* VERIFICACIONES SQL PARA VALIDAR DATOS DE DISPOSITIVOS */
import sql from 'mssql';

// Comprobar que existe la sucursal antes de cualquier operación con los dispositivos
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // La sucursal existe
  } catch (error) {
    console.error('Error al comprobar la sucursal:', error);
  }
};

// Comprobar que la ip del dispositivo no esta ocupada
const IpOcupada = async (ip) => {
  try {
    const query = 'SELECT ip FROM dispositivos WHERE ip = @ip';
    const request = new sql.Request();
    request.input('ip', sql.VarChar, ip)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // La ip esta ocupada
  } catch (error) {
    console.error('Error al comprobar la IP:', error);
  }
};

// Comprobar que ID del dispositivo existe para corrobar ejecución
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM dispositivos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // El ID exite
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

export const verificaciones = {
  SucursalExiste,
  IpOcupada,
  comprobarID
};