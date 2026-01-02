/* VERIFICACIONES SQL DE PANEL DE DISPOSITIVOS */
import sql from 'mssql';

// Verificar que existe la sucursal antes de cualquier operación con los dispositivos
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // La sucursal existe
  } catch (error) {
    console.error('Error: // Verificar que existe la sucursal antes de cualquier operación con los dispositivos, ', error);
  }
};

// Verificar que la ip del dispositivo no esta ocupada
const IpOcupada = async (ip) => {
  try {
    const query = 'SELECT ip FROM dispositivos WHERE ip = @ip';
    const request = new sql.Request();
    request.input('ip', sql.VarChar, ip)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // La ip esta ocupada
  } catch (error) {
    console.error('Error: // Verificar que la ip del dispositivo no esta ocupada, ', error);
  }
};

// Verificar que ID del dispositivo existe para corrobar ejecución
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM dispositivos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // El ID exite
  } catch (error) {
    console.error('Error: // Verificar que ID del dispositivo existe para corrobar ejecución, ', error);
  }
};

export const verificaciones = {
  SucursalExiste,
  IpOcupada,
  comprobarID
};