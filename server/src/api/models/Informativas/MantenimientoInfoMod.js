/* MODEL DE INFORMATIVA -- MANTENIMIENTO */
import sql from 'mssql';

// Mandar las fechas vinculadas al economico
const getFechasRealizadas = async (economico, responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
      SELECT mante.id AS id, mante.fecharealizada AS realizado, mante.economico AS economico, 
              sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable 
      FROM mantenimientos mante INNER JOIN sucursales sucu ON mante.economico = sucu.economico 
      WHERE mante.economico = @economico AND mante.fecharealizada IS NOT NULL AND sucu.ingresponsable = @responsable
      ORDER BY mante.fecharealizada DESC
      `;
  } else {
    query = `
      SELECT mante.id AS id, mante.fecharealizada AS realizado, mante.economico AS economico, 
              sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable 
      FROM mantenimientos mante INNER JOIN sucursales sucu ON mante.economico = sucu.economico 
      WHERE mante.economico = @economico AND mante.fecharealizada IS NOT NULL
      ORDER BY mante.fecharealizada DESC
      `;
  }
  request.input('economico', sql.VarChar, economico);
  request.input('responsable', sql.VarChar, responsable);
  return (await request.query(query)).recordset;
};

// Mandar el documento del mantemiento seleccionado
const getFechaSeleccionada = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  const result = await request.query(`SELECT constancia FROM mantenimientos WHERE id = @id`);
  return result.recordset[0];
};

// Mandar el archivo de la constancia de la fecha seleccionada
const getMantenimientoArchivo = async (fechasr) => {
  const request = new sql.Request();
  request.input('fechasr', sql.Date, fechasr);
  const constanciaAr = await request.query(`SELECT constancia FROM mantenimientos WHERE fecharealizada = @fechasr`);
  return constanciaAr.recordset[0];
};

// Mandar todas las constancias
const getMantenimientosArchivos = async (economico) => {
  const request = new sql.Request();
  request.input('economico', sql.VarChar, economico)
  const constanciasAr = await request.query(`SELECT constancia FROM mantenimientos WHERE economico = @economico AND constancia IS NOT NULL ORDER BY fecharealizada DESC`);
  return constanciasAr.recordset;
};

/* Verificaciones */
// Comprobar que existe la sucursal antes de cualquier operación con los dispositivos
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // La sucursal existe
  } catch (error) {
    console.error('Error al comprobar la sucursal:', error);
  }
};

export const db = {
  getFechasRealizadas,
  getFechaSeleccionada,
  getMantenimientoArchivo,
  getMantenimientosArchivos
};

export const verificaciones = {
  SucursalExiste
};