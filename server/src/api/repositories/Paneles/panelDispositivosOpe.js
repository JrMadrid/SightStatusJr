/* OPERACIONES SQL PARA MANEJAR DATOS DE DISPOSITIVOS */
import sql from 'mssql';

// Pedir los datos de los dispositivos
const getDispositivos = async (responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
          SELECT dispo.id AS id, dispo.nombre AS dispositivo, dispo.ip AS ip, 
                  sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal 
          FROM sucursales sucu 
          INNER JOIN dispositivos dispo ON sucu.economico = dispo.economico 
          WHERE sucu.ingresponsable = @responsable 
          ORDER BY sucu.canal ASC, sucu.nombre ASC
        `;
  } else {
    query = `
          SELECT dispo.id AS id, dispo.nombre AS dispositivo, dispo.ip AS ip, 
                  sucu.economico AS economico, sucu.canal AS canal, sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable
          FROM sucursales sucu 
          INNER JOIN dispositivos dispo ON sucu.economico = dispo.economico 
          ORDER BY sucu.canal ASC, sucu.nombre ASC
        `;
  };
  request.input('responsable', sql.NVarChar, responsable);
  return (await request.query(query)).recordset;
}

// Pedir la lista de los dispositivos
const getListaDispositivos = async (responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
          SELECT dispo.nombre 
          FROM dispositivos dispo 
          INNER JOIN sucursales sucu ON sucu.economico = dispo.economico 
          WHERE sucu.ingresponsable = @responsable 
          GROUP BY dispo.nombre 
          ORDER BY nombre ASC
    `;
  } else {
    query = `
          SELECT dispo.nombre 
          FROM dispositivos dispo 
          INNER JOIN sucursales sucu ON sucu.economico = dispo.economico 
          GROUP BY dispo.nombre 
          ORDER BY nombre ASC
    `;
  }
  request.input('responsable', sql.NVarChar, responsable);
  return (await request.query(query)).recordset;
};

// Agregar un nuevo dispositivo
const postDispositivo = async ({ economico, ip, nombre, descripcion, general }) => {
  const request = new sql.Request();
  request.input('ip', sql.VarChar, ip);
  request.input('economico', sql.VarChar, economico);
  request.input('nombre', sql.NVarChar, nombre);
  // Opcionales: si no vienen → mandamos null para SQL
  request.input('descripcion', sql.NVarChar, descripcion || null);
  request.input('general', sql.NVarChar, general || null);
  await request.query(`
		INSERT INTO dispositivos (ip, economico, nombre, descripcion, general)
		VALUES (@ip, @economico, @nombre, @descripcion, @general)
		`);
};

// Actualizar un dispositivo
const updateDispositivo = async ({ id, economico, ip, nombre, descripcion, general, reiniciar }) => {
  const updates = [];
  const request = new sql.Request();
  if (economico) {
    updates.push('economico = @economico');
    request.input('economico', sql.VarChar, economico);
  }
  if (ip) {
    updates.push('ip = @ip');
    request.input('ip', sql.VarChar, ip);
  }
  if (nombre) {
    updates.push('nombre = @nombre');
    request.input('nombre', sql.NVarChar, nombre);
  }
  if (reiniciar === 'yes') {
    updates.push("descripcion = ''", "general = ''");
  } else {
    if (descripcion) {
      updates.push('descripcion = @descripcion');
      request.input('descripcion', sql.NVarChar, descripcion);
    }
    if (general) {
      updates.push('general = @general');
      request.input('general', sql.NVarChar, general);
    }
  }
  if (!updates.length) throw { code: 400, message: 'Sin cambios válidos' };
  const query = `UPDATE dispositivos SET ${updates.join(', ')} WHERE id = @id`;
  request.input('id', sql.Int, id);
  await request.query(query);
};

// Eliminar un dispositivo
const deleteDispositivo = async ({ id }) => {
  const transaction = new sql.Transaction();
  try {
    await transaction.begin();
    const request = new sql.Request(transaction);
    request.input('id', sql.Int, id);
    await request.query('ALTER TABLE alarmas NOCHECK CONSTRAINT FK_alarmas_dispositivos_ip');
    await request.query('DELETE FROM dispositivos WHERE id = @id');
    await request.query('ALTER TABLE alarmas CHECK CONSTRAINT FK_alarmas_dispositivos_ip');
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción: ', rollbackError);
      }
    }
    console.error('Error: // Eliminar un dispositivo, ', error);
  }
};

export const operaciones = {
  getDispositivos,
  getListaDispositivos,
  postDispositivo,
  updateDispositivo,
  deleteDispositivo
};