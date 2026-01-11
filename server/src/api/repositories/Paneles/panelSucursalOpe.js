/* OPERACIONES SQL PARA MANEJAR DATOS DE SUCURSALES */
import sql from 'mssql';

// Pedir los datos de las sucursales
const getSucursales = async (responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Super Administrador' || tipo === 'Administrador') {
    query = `
          SELECT id, economico, canal, nombre, ingresponsable 
          FROM sucursales 
          ORDER BY canal ASC, nombre ASC
          `;
  }
  else if (tipo === 'Aplicativo') {
    query = `
          SELECT economico, canal, nombre, ingresponsable 
          FROM sucursales 
          WHERE economico != 000000 
          ORDER BY canal ASC, nombre ASC 
    `;
  } else {
    query = `
          SELECT economico, canal, nombre 
          FROM sucursales 
          WHERE ingresponsable = @responsable 
          ORDER BY canal ASC, nombre ASC 
      `;
    request.input('responsable', sql.NVarChar, responsable);
  }
  return (await request.query(query)).recordset;
};

// Agregar una nueva sucursal
const postSucursal = async ({ economico, canal, nombre, ingresponsable, rellenar }) => {
  function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 250) + 1;
  }
  const request = new sql.Request();
  let dispos;
  request.input('economico', sql.VarChar, economico);
  request.input('canal', sql.NVarChar, canal);
  request.input('nombre', sql.NVarChar, nombre);
  request.input('ingresponsable', sql.NVarChar, ingresponsable);
  // Crear su respectivo elemento de personal
  const query = 'INSERT INTO sucursales (economico, canal, nombre, ingresponsable) VALUES (@economico, @canal, @nombre, @ingresponsable)';
  await request.query(query);
  await request.query(`INSERT INTO ubicacion (economico) VALUES ('${economico}')`);

  if (rellenar === 'yes') {
    dispos = (await sql.query(`SELECT dispo.nombre from dispositivos dispo INNER JOIN sucursales sucu ON sucu.economico = dispo.economico GROUP BY dispo.nombre`)).recordset;
    for (let i = 0; i < dispos.length; i++) {
      let ip = `000.${obtenerNumeroAleatorio()}.${obtenerNumeroAleatorio()}.${obtenerNumeroAleatorio()}`;
      await request.query(`INSERT INTO dispositivos ([ip],[economico],[nombre]) VALUES ('${ip}','${economico}','${dispos[i].nombre}')`);
    }
  };
};

// Actualizar una sucursal
const updateSucursal = async ({ economico, canal, nombre, id, ingresponsable, rellenar }) => {
  function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 250) + 1;
  }
  let transaction;
  try {
    let economicoRellenar = '';
    if (rellenar === 'yes') { // Si quiere rellenar la sucursal de dispositivos que representen "Sin inventario"
      if (economico) { // Cambiar el economico ya que serian diferentes
        economicoRellenar = economico;
      }
      else { // No cambiar el economico ya que serian diferentes
        economicoRellenar = (await sql.query(`SELECT economico from sucursales WHERE id = '${id}'`)).recordset[0].economico; // Para identificar a que economico se le va a rellenar los dispositivos
      }
    }
    const updates = [];
    if (economico) {
      updates.push('economico = @economico');
    }
    if (canal) {
      updates.push('canal = @canal');
    }
    if (nombre) {
      updates.push('nombre = @nombre');
    }
    if (ingresponsable) {
      updates.push('ingresponsable = @ingresponsable');
    }
    if (updates.length === 0 && rellenar !== 'yes') { // No hay cambios ni quiere rellenar
      throw { code: 400, message: 'No hay datos para actualizar' };
    }
    const numeroE = await Neconomico(id);
    transaction = new sql.Transaction();
    await transaction.begin();
    const request = new sql.Request(transaction);
    let query = '';
    if (updates.length !== 0) { // Si hay cambios
      query = `UPDATE sucursales SET ${updates.join(', ')} WHERE economico = '${numeroE}'`;
    }
    request.input('economico', sql.VarChar, economico);
    request.input('canal', sql.NVarChar, canal);
    request.input('nombre', sql.NVarChar, nombre);
    request.input('ingresponsable', sql.NVarChar, ingresponsable);
    if (!economico) {
      await request.query(query);
    }
    if (economico) { // Si actualiza el economico debe cambiar en todas las tablas
      await request.query('ALTER TABLE ubicacion NOCHECK CONSTRAINT FK_ubicacion_sucursales_economico');
      await request.query('ALTER TABLE dispositivos NOCHECK CONSTRAINT FK_dispositivos_sucursales_economico');
      await request.query('ALTER TABLE mantenimientos NOCHECK CONSTRAINT FK_mantenimientos_sucursales_economico');
      await request.query('ALTER TABLE informes NOCHECK CONSTRAINT FK_informes_sucursales_economico');
      await request.query(query);
      await request.query(`UPDATE ubicacion SET economico = '${economico}' FROM ubicacion WHERE economico = '${numeroE}'`);
      await request.query(`UPDATE dispositivos SET economico = '${economico}' FROM dispositivos WHERE economico = '${numeroE}'`);
      await request.query(`UPDATE mantenimientos SET economico = '${economico}' FROM mantenimientos WHERE economico = '${numeroE}'`);
      await request.query(`UPDATE informes SET economico = '${economico}' FROM informes WHERE economico = '${numeroE}'`);
      await request.query('ALTER TABLE ubicacion CHECK CONSTRAINT FK_ubicacion_sucursales_economico');
      await request.query('ALTER TABLE dispositivos CHECK CONSTRAINT FK_dispositivos_sucursales_economico');
      await request.query('ALTER TABLE mantenimientos CHECK CONSTRAINT FK_mantenimientos_sucursales_economico');
      await request.query('ALTER TABLE informes CHECK CONSTRAINT FK_informes_sucursales_economico');
    };
    await transaction.commit();

    if (rellenar === 'yes') { // Cambios o no pero quiere rellenar
      const request = new sql.Request();
      const disposTodos = (await sql.query(`SELECT dispo.nombre from dispositivos dispo INNER JOIN sucursales sucu ON sucu.economico = dispo.economico GROUP BY dispo.nombre`)).recordset; // Obtenemos todos los dispositivos de la base de datos
      const disposTiene = (await sql.query(`SELECT dispo.nombre from dispositivos dispo INNER JOIN sucursales sucu ON sucu.economico = dispo.economico WHERE sucu.economico = '${economicoRellenar}' GROUP BY dispo.nombre`)).recordset; // Obtenemos los dispositivos que tiene la sucursal

      function disposNoTiene(Todos, Tiene) { // Funcion para obtener los dispositivos que no tiene la sucursal
        return Todos.filter(obj1 =>
          !Tiene.some(obj2 => obj2.nombre === obj1.nombre)
        );
      };
      const disposFaltantes = disposNoTiene(disposTodos, disposTiene); // Obtenemos los dispositivos que no tiene la sucursal

      for (let i = 0; i < disposFaltantes.length; i++) {
        let ip = `000.${obtenerNumeroAleatorio()}.${obtenerNumeroAleatorio()}.${obtenerNumeroAleatorio()}`;
        await request.query(`INSERT INTO dispositivos ([ip],[economico],[nombre]) VALUES ('${ip}','${economicoRellenar}','${disposFaltantes[i].nombre}')`);
      }
    };
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción: ', rollbackError);
      }
    }
    console.error('Error: // Actualizar una sucursal, ', error);
  }
};

// Eliminar una sucursal
const deleteSucursal = async ({ id }) => {
  let transaction;
  try {
    const numeroE = await Neconomico(id);
    transaction = new sql.Transaction();
    await transaction.begin();
    const request = new sql.Request(transaction);
    await request.query('ALTER TABLE ubicacion NOCHECK CONSTRAINT FK_ubicacion_sucursales_economico');
    await request.query('ALTER TABLE dispositivos NOCHECK CONSTRAINT FK_dispositivos_sucursales_economico');
    await request.query('ALTER TABLE mantenimientos NOCHECK CONSTRAINT FK_mantenimientos_sucursales_economico');
    await request.query('ALTER TABLE informes NOCHECK CONSTRAINT FK_informes_sucursales_economico');
    await request.query(`DELETE FROM sucursales WHERE economico = '${numeroE}'`); // Se elimina la sucursal
    await request.query(`DELETE FROM ubicacion WHERE economico = '${numeroE}'`); // Se elimina la ubicacion de la sucursal
    await request.query(`DELETE FROM mantenimientos WHERE economico = '${numeroE}'`); // Se eliminan los mantenimientos de la sucursal
    await request.query(`DELETE FROM informes WHERE economico = '${numeroE}'`); // Se eliminan los informes de la sucursal
    await request.query(`DELETE FROM dispositivos WHERE economico = '${numeroE}' AND (ip LIKE '000.%' OR ip LIKE '001.%')`); // Se eliminan las ips de los dispositivos no validas de la sucursal
    await request.query(`UPDATE dispositivos SET economico = '000000' FROM dispositivos WHERE economico = ${numeroE} AND (ip NOT LIKE '000.%' OR ip NOT LIKE '001.%')`); // Sus dispositivos pasan a sucursal especial "Sin establecer"
    await request.query('ALTER TABLE ubicacion CHECK CONSTRAINT FK_ubicacion_sucursales_economico');
    await request.query('ALTER TABLE informes CHECK CONSTRAINT FK_informes_sucursales_economico');
    await request.query('ALTER TABLE mantenimientos CHECK CONSTRAINT FK_mantenimientos_sucursales_economico');
    await request.query('ALTER TABLE dispositivos CHECK CONSTRAINT FK_dispositivos_sucursales_economico');
    await transaction.commit();
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción: ', rollbackError);
      }
    }
    console.error('Error: // Eliminar una sucursal, ', error);
  }
};

// Conseguir el economico para transacción 
const Neconomico = async (id) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE id = @id'
    const request = new sql.Request();
    request.input('id', sql.VarChar, id)
    const resultado = await request.query(query);
    return resultado.recordset[0].economico;
  } catch (error) {
    console.error('Error: // Conseguir el economico para transacción, ', error);
  }
};

export const operaciones = {
  getSucursales,
  postSucursal,
  updateSucursal,
  deleteSucursal
};