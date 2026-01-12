/* INSERCIÓN DE DATOS INICIALES */
import bcrypt from 'bcryptjs';
import sql from 'mssql';

// Insertar datos iniciales en la base de datos
const datosDB = async () => {
  const queryI = 'SELECT COUNT(*) AS cantidad FROM USERS';
  const request = new sql.Request();
  const cantidad = (await request.query(queryI)).recordset[0].cantidad;
  if (cantidad > 0) return;
  let transaction;
  try {
    transaction = new sql.Transaction();
    await transaction.begin();
    const ingresarDatos = new sql.Request(transaction);

    // Datos
    const nickname = 'Lider';
    const hash = bcrypt.hashSync('lider', 10);
    const sucursal = '000000';

    // Users
    await ingresarDatos.query(`DBCC CHECKIDENT ('users', RESEED, 1)`);
    await ingresarDatos
      .input('nickname', sql.NVarChar, nickname)
      .input('psw', sql.NVarChar, hash)
      .input('isAdmin', sql.Bit, 1)
      .input('tipo', sql.NVarChar, 'Super Administrador')
      .query(`
      INSERT INTO users (nickname, psw, isAdmin, tipo)
      VALUES (@nickname, @psw, @isAdmin, @tipo)
      `);

    // Personal
    await ingresarDatos.query(`DBCC CHECKIDENT ('personal', RESEED, 1)`);
    await ingresarDatos
      .query(`
      INSERT INTO personal (nickname)
      VALUES (@nickname)
      `);

    // Sucursales
    await ingresarDatos.query(`DBCC CHECKIDENT ('sucursales', RESEED, 1)`);
    await ingresarDatos
      .input('canal', sql.NVarChar, ' ')
      .input('nombre', sql.NVarChar, 'Sin establecer')
      .input('economico', sql.VarChar, sucursal)
      .input('ingresponsable', sql.NVarChar, nickname)
      .query(`
      INSERT INTO sucursales (canal, nombre, economico, ingresponsable)
      VALUES (@canal, @nombre, @economico, @ingresponsable)
      `);

    // Ubicacion
    await ingresarDatos.query(`DBCC CHECKIDENT ('ubicacion', RESEED, 1)`);
    await ingresarDatos
      .input('descripcion', sql.NVarChar,
        'Sucursal especial, toma los dispositivos que se han quedado sin sucursal al ser eliminada la sucursal que los poseía'
      )
      .query(`
        INSERT INTO ubicacion (economico, descripcion)
        VALUES (@economico, @descripcion)
      `);

    await transaction.commit();
    console.log('Todos los datos iniciales insertados correctamente');
  } catch (error) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error al revertir la transacción: ', rollbackError);
      }
    }
    console.error('Error: // Insertar datos iniciales en la base de datos, ', error);
  }
};

export default datosDB;