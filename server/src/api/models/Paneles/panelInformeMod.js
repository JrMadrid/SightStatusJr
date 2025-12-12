/* MODEL PARA VALIDAR DATOS DE INFORMES */
import sql from 'mssql';

// Pedir los datos de los informes
const getInformes = async (tipo, responsable) => {
  let query;
  let request = new sql.Request();
  request.input('responsable', sql.VarChar, responsable);
  if (tipo === 'Geografia') {
    query = `SELECT infor.id AS id, infor.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal,
                        infor.fecharealizada AS fecharealizada, infor.nombre AS nombre, infor.descripcion AS descripcion 
                FROM informes infor 
                INNER JOIN sucursales sucu ON sucu.economico = infor.economico 
                WHERE sucu.ingresponsable = @responsable 
                ORDER BY fecharealizada DESC`;
  }
  else {
    query = `SELECT infor.id AS id, infor.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal,
                        infor.fecharealizada AS fecharealizada, infor.nombre AS nombre, infor.descripcion AS descripcion, sucu.ingresponsable AS ingresponsable 
                FROM informes infor 
                INNER JOIN sucursales sucu ON sucu.economico = infor.economico 
                ORDER BY infor.fecharealizada DESC`;
  }
  let result = await request.query(query);
  return result.recordset;
};

// Agregar un nuevo informe
const postInforme = async ({ descripcion, nombre, documento, frealizada, economico }, informe) => {
  const request = new sql.Request();
  const query = 'INSERT INTO informes(nombre, descripcion, informe, fecharealizada, economico) VALUES (@nombre, @descripcion, CONVERT(VARBINARY(MAX), @informe), @fecharealizada, @economico)';
  request.input('informe', sql.VarBinary(sql.MAX), informe); 
  if (!nombre) {
    request.input('nombre', sql.NVarChar, documento.toString());
  } else {
    request.input('nombre', sql.NVarChar, nombre);
  }
  request.input('descripcion', sql.NVarChar, descripcion);
  request.input('fecharealizada', sql.Date, frealizada);
  request.input('economico', sql.VarChar, economico);
  await request.query(query);
};

// Eliminar un informe
const deleteInforme = async ({ id }) => {
  const request = new sql.Request();
  request.input('id', sql.Numeric, id);
  const query = 'DELETE FROM informes WHERE id = @id';
  await request.query(query);
};

// Pedir el informe en formato PDF
const informeArchivo = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.VarChar, id);
  const query = 'SELECT informe FROM informes WHERE id = @id';
  const resultado = await request.query(query);
  return resultado.recordset[0];
};

/* Verificaciones */
// Comprobar que existe la sucursal antes de cualquier operación con los informes
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

// Comprobar que la sucursal le pertenezca a ese usuario
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

// Comprobar que ID del informe existe para corrobar ejecución
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

export const db = {
  getInformes,
  postInforme,
  deleteInforme,
  informeArchivo,
};

export const verificaciones = {
  SucursalExiste,
  SucursalPerteneciente,
  comprobarID
};