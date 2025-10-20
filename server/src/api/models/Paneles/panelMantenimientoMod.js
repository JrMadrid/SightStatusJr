/* MODEL PARA VALIDAR DATOS DE MANTENIMIENTOS */
import sql from 'mssql';

// Pedir los datos de los mantenimientos
export const getMantenimientos = async (responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
        SELECT sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable, 
                mant.id AS id, mant.fechaestimada AS festimada, mant.fecharealizada AS frealizada, mant.descripcion AS descripcion 
        FROM sucursales sucu 
        INNER JOIN mantenimiento mant ON sucu.economico = mant.economico 
        WHERE sucu.economico != 000000 AND sucu.ingresponsable = @responsable 
        ORDER BY sucu.canal ASC, sucu.nombre ASC, mant.fechaestimada DESC 
        `;
  } else {
    query = `
        SELECT sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable, 
                mant.id AS id, mant.fechaestimada AS festimada, mant.fecharealizada AS frealizada, mant.descripcion AS descripcion
        FROM sucursales sucu 
        INNER JOIN mantenimiento mant ON sucu.economico = mant.economico 
        WHERE sucu.economico != 000000 
        ORDER BY sucu.canal ASC, sucu.nombre ASC, mant.fechaestimada DESC 
        `;
  }
  request.input('responsable', sql.VarChar, responsable);
  return (await request.query(query)).recordset;
};

// Agregar un nuevo mantenimiento
export const postMantenimiento = async (festimada, economico) => {
  const request = new sql.Request();
  request.input('fechaestimada', sql.Date, festimada);
  request.input('economico', sql.VarChar, economico);
  await request.query(`INSERT INTO mantenimiento(fechaestimada, economico) VALUES (@fechaestimada, @economico)`);
};

// Agregar constancia de mantenimiento
export const actualizarMantenimientoConConstancia = async (datos) => {
  const transaction = new sql.Transaction();
  await transaction.begin();

  try {
    const request = new sql.Request(transaction);
    request.input('fecharealizada', sql.Date, datos.frealizada);
    request.input('imagen', sql.VarBinary(sql.MAX), datos.imagen);
    request.input('descripcion', sql.VarChar, datos.descripcion);
    request.input('id', sql.Numeric, datos.id);
    await request.query(`
      UPDATE mantenimiento 
      SET fecharealizada = @fecharealizada, constancia = @imagen, descripcion = @descripcion 
      WHERE id = @id
      `);

    if (datos.yy > '2024') {
      await insertarNuevaFechaEstimada(transaction, datos.siguiFEstimada, datos.suSucursal);
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
};

// Agregar fecha de constancia de mantenimiento
export const insertarNuevaFechaEstimada = async (transaction, fechaestimada, economico) => {
  const request = new sql.Request(transaction);
  request.input('fechaestimada', sql.Date, fechaestimada);
  request.input('economico', sql.VarChar, economico);
  await request.query(`
    INSERT INTO mantenimiento(fechaestimada, economico) 
    VALUES (@fechaestimada, @economico)
  `);
};

// Actualizar un  mantenimiento
export const updateMantenimiento = async (festimada, economico, id) => {
  const updates = [];
  const request = new sql.Request();
  if (festimada.length !== 0) {
    updates.push('fechaestimada = @festimada');
    request.input('festimada', sql.Date, festimada);
  }
  if (economico.length !== 0) {
    updates.push('economico = @economico');
    request.input('economico', sql.VarChar, economico);
  }
  if (updates.length === 0) {
    throw { code: 400, message: 'No hay datos para actualizar' };
  }
  request.input('id', sql.Numeric, id);
  const query = `UPDATE mantenimiento SET ${updates.join(', ')} WHERE id = @id`;
  await request.query(query);
};

// Eliminar un mantenimiento
export const deleteMantenimiento = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.Numeric, id);
  await request.query('DELETE FROM mantenimiento WHERE id = @id');
};

/* Validaciones */
/* Comprobar que existe la sucursal antes de cualquier operación con los dispositivos */
async function SucursalExiste(economico) {
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

/* Comprobar que fecha estimada es mayor a 01/Enero/2024 */
async function comprobarFechaEstimada(festimada) {
  try {
    return '2024-01-01' < festimada;
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

/* Comprobar que fecha realizada es mayor que fecha estimada */
async function comprobarFechaRealizada(frealizada, id) {
  try {
    const festimada = 'SELECT fechaestimada FROM mantenimiento WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.Numeric, id);
    const response = await request.query(festimada); // Ejecutar la consulta   
    let fechaestimada = response.recordset[0].fechaestimada
    let fechaestimadacons = fechaestimada.toISOString();
    fechaestimadacons = fechaestimadacons.split('T')[0]; // "2024-01-17"        
    return fechaestimadacons < frealizada;
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

/* Comprobar que fecha realizada es mayor que fecha estimada */
async function ConstanciaExiste(id) {
  try {
    const query = 'SELECT constancia FROM mantenimiento WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset[0].constancia !== null;// Ya tiene mantenimiento
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

/* Comprobar que el mantenimiento es de su sucursal - geografia */
async function comprobarSuMantenimiento(id, responsable) {
  try {
    const query = 'SELECT sucu.ingresponsable AS ingeniero FROM mantenimiento mante INNER JOIN sucursales sucu ON sucu.economico = mante.economico WHERE mante.id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    const ingeniero = resultado.recordset[0].ingeniero;

    return responsable.toLowerCase() === ingeniero.toLowerCase(); // Si es su mantenimiento
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

/* Saber el economico */
async function ecoSucursal(id) {
  try {
    const query = 'SELECT economico FROM mantenimiento WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);

    return resultado.recordset[0].economico;
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

/* Siguiente estimado */
async function nextFEstimada(frealizado) {
  let siguiFEstimada = '';
  let [yy, mm, dd] = frealizado.split('-');
  yy = parseInt(yy);
  mm = parseInt(mm);
  let siguiY = yy;
  if (6 < mm) {
    // console.log('segundo semestre, le toca el primer semestre del otro año');
    siguiY = siguiY + 1;
    siguiFEstimada = `${siguiY}-01-01`;
  } else {
    // console.log('primer semestre, le toca el segundo semestre del mismo otro año');
    siguiFEstimada = `${yy}-07-01`;
  }
  return siguiFEstimada;
};

/* Comprobar que ID del dispositivo existe para corrobar ejecución */
async function comprobarID(id) {
  try {
    const query = 'SELECT id FROM mantenimiento WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // El ID exite
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
};

export { SucursalExiste, comprobarFechaEstimada, comprobarFechaRealizada, ConstanciaExiste, comprobarSuMantenimiento, ecoSucursal, nextFEstimada, comprobarID };