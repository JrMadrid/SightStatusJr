/* OPERACIONES SQL PARA MANEJAR DATOS DE MANUALES */
import sql from 'mssql';

// Pedir los datos de los manuales
const getManuales = async () => {
  const request = new sql.Request();
  let result = await request.query(`SELECT id, nombre, descripcion FROM manuales`);
  return result.recordset;
};

// Agregar un nuevo manual
const postManuales = async ({ descripcion, nombre, documento }, manual) => {
  const request = new sql.Request();
  request.input('manual', sql.VarBinary(sql.MAX), manual);
  if (!nombre) {
    request.input('nombre', sql.NVarChar, documento.toString());
  } else {
    request.input('nombre', sql.NVarChar, nombre);
  }
  request.input('descripcion', sql.NVarChar, descripcion);
  await request.query(`INSERT INTO manuales(nombre, descripcion, manual) VALUES (@nombre, @descripcion, CONVERT(VARBINARY(MAX), @manual))`);
};

// Actualizar un manual
const updateManual = async ({ nombre, descripcion, id }) => {
  const request = new sql.Request();
  request.input('nombre', sql.NVarChar, nombre);
  request.input('descripcion', sql.NVarChar, descripcion);
  request.input('id', sql.Numeric, id);
  const updates = [];
  if (nombre) {
    updates.push('nombre = @nombre');
  }
  if (descripcion) {
    updates.push('descripcion = @descripcion');
  }
  if (updates.length === 0) {
    throw { code: 404, message: 'No hay datos para actualizar' };
  }
  await request.query(`UPDATE manuales SET ${updates.join(', ')} WHERE id = @id`);
};

// Eliminar un manual
const deleteManual = async ({ id }) => {
  const request = new sql.Request();
  request.input('id', sql.Numeric, id);
  await request.query('DELETE FROM manuales WHERE id = @id');
};

// Pedir el manual en formato PDF
const Manual = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  const resultado = await request.query('SELECT manual FROM manuales WHERE id = @id');
  return resultado.recordset[0];
};

export const operaciones = {
  getManuales,
  postManuales,
  updateManual,
  deleteManual,
  Manual
};