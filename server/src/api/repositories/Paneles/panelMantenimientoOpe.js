/* OPERACIONES SQL PARA MANEJAR DATOS DE MANTENIMIENTOS */
import sql from 'mssql';

// Pedir los datos de los mantenimientos
const getMantenimientos = async (responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
        SELECT sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable, 
                mant.id AS id, mant.fechaestimada AS festimada, mant.fecharealizada AS frealizada, mant.descripcion AS descripcion 
        FROM sucursales sucu 
        INNER JOIN mantenimientos mant ON sucu.economico = mant.economico 
        WHERE sucu.economico != 000000 AND sucu.ingresponsable = @responsable 
        ORDER BY sucu.canal ASC, sucu.nombre ASC, mant.fechaestimada DESC 
        `;
  } else {
    query = `
        SELECT sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable, 
                mant.id AS id, mant.fechaestimada AS festimada, mant.fecharealizada AS frealizada, mant.descripcion AS descripcion
        FROM sucursales sucu 
        INNER JOIN mantenimientos mant ON sucu.economico = mant.economico 
        WHERE sucu.economico != 000000 
        ORDER BY sucu.canal ASC, sucu.nombre ASC, mant.fechaestimada DESC 
        `;
  }
  request.input('responsable', sql.VarChar, responsable);
  return (await request.query(query)).recordset;
};

// Agregar un nuevo mantenimiento
const postMantenimiento = async ({ festimada, economico }) => {
  const request = new sql.Request();
  request.input('fechaestimada', sql.Date, festimada);
  request.input('economico', sql.VarChar, economico);
  await request.query(`INSERT INTO mantenimientos (fechaestimada, economico) VALUES (@fechaestimada, @economico)`);
};

// Agregar constancia de mantenimiento
const actualizarMantenimientoConConstancia = async ({ frealizada, descripcion, imagen, id, yy, siguiFEstimada, suSucursal }) => {
  const transaction = new sql.Transaction();
  try {
    await transaction.begin();
    const request = new sql.Request(transaction);
    request.input('fecharealizada', sql.Date, frealizada);
    request.input('imagen', sql.VarBinary(sql.MAX), imagen);
    request.input('descripcion', sql.VarChar, descripcion);
    request.input('id', sql.VarChar, id);
    await request.query(`
      UPDATE mantenimientos 
      SET fecharealizada = @fecharealizada, constancia = @imagen, descripcion = @descripcion 
      WHERE id = @id
      `);
    if (yy > '2024') {
      await insertarNuevaFechaEstimada(transaction, siguiFEstimada, suSucursal);
    }
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

// Agregar fecha de constancia de mantenimiento
const insertarNuevaFechaEstimada = async (transaction, fechaestimada, economico) => {
  const request = new sql.Request(transaction);
  request.input('fechaestimada', sql.Date, fechaestimada);
  request.input('economico', sql.VarChar, economico);
  await request.query(`
    INSERT INTO mantenimientos (fechaestimada, economico) 
    VALUES (@fechaestimada, @economico)
  `);
};

// Actualizar un  mantenimiento
const updateMantenimiento = async ({ festimada, economico, id }) => {
  const updates = [];
  const request = new sql.Request();
  if (festimada) {
    updates.push('fechaestimada = @festimada');
    request.input('festimada', sql.Date, festimada);
  }
  if (economico) {
    updates.push('economico = @economico');
    request.input('economico', sql.VarChar, economico);
  }
  if (updates.length === 0) {
    throw { code: 400, message: 'No hay datos para actualizar' };
  }
  request.input('id', sql.Numeric, id);
  const query = `UPDATE mantenimientos SET ${updates.join(', ')} WHERE id = @id`;
  await request.query(query);
};

// Eliminar un mantenimiento
const deleteMantenimiento = async ({ id }) => {
  const request = new sql.Request();
  request.input('id', sql.Numeric, id);
  await request.query('DELETE FROM mantenimientos WHERE id = @id');
};

export const operaciones = {
  getMantenimientos,
  postMantenimiento,
  actualizarMantenimientoConConstancia,
  insertarNuevaFechaEstimada,
  updateMantenimiento,
  deleteMantenimiento
};