/* VERIFICACIONES SQL DE INFORMATIVA -- UBICACIÓN */
import sql from 'mssql';

// Comprobar que existe la sucursal antes de cualquier operación
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // La sucursal existe
  } catch (error) {
    console.error('Error al comprobar la sucursal: ', error);
  }
};

// Verificar si la ubicacion existe
const UbicacionExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM ubicacion WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const response = await request.query(query);
    return response.recordset.length > 0; // La ubicacion existe
  } catch (error) {
    console.error('Error al comprobar la ubicación: ', error);
  }
};

// Comprobar que la sucursal le pertenezca a ese usuario
const SucursalPerteneciente = async (economico, responsable) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico AND ingresponsable = @usuario';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    request.input('usuario', sql.NVarChar, responsable);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error al comprobar la sucursal: ', error);
  }
};

export const verificaciones = {
  SucursalExiste,
  UbicacionExiste,
  SucursalPerteneciente
};