/* VERIFICACIONES SQL DE PANEL DE SUCURSALES */
import sql from 'mssql';

// Evitar modificación de la sucursal "Sin establecer"
const IDdelSinEstablecer = async (id) => {
  try {
    const query = 'SELECT nombre FROM sucursales WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.Numeric, id);
    const nombre = ((await request.query(query)).recordset[0].nombre);
    return nombre === 'Sin establecer'; // Devuelve `true` si es el sin establecer
  } catch (error) {
    console.error('Error: // Evitar modificación de la sucursal "Sin establecer", ', error);
  }
};

// Verificar que el economico no esta ocupado 
const EconomicoOcupado = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error: // Verificar que el economico no esta ocupado, ', error);
  }
};

// Verificar que ID de la sucursal existe para corrobar ejecución 
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM sucursales WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error: // Verificar que ID de la sucursal existe para corrobar ejecución, ', error);
  }
};

// Verificar que existe el ingresponsable
const IngResponsable = async (ingresponsable) => {
  try {
    const query = 'SELECT nickname FROM users WHERE nickname = @ingresponsable'
    const request = new sql.Request();
    request.input('ingresponsable', sql.NVarChar, ingresponsable)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error: // Verificar que existe el ingresponsable, ', error);
  }
};

export const verificaciones = {
  IDdelSinEstablecer,
  EconomicoOcupado,
  comprobarID,
  IngResponsable
};