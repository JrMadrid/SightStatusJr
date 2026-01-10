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
    await ingresarDatos
      .input('nickname', sql.VarChar, nickname)
      .input('psw', sql.VarChar, hash)
      .input('isAdmin', sql.Bit, 1)
      .input('tipo', sql.VarChar, 'Super Administrador')
      .query(`
        INSERT INTO users (nickname, psw, isAdmin, tipo)
        VALUES (@nickname, @psw, @isAdmin, @tipo)
      `);

    // Personal
    await ingresarDatos
      .input('nickname', sql.VarChar, nickname)
      .query(`
        INSERT INTO personal (nickname)
        VALUES (@nickname)
      `);

    // Sucursales
    await ingresarDatos
      .input('canal', sql.VarChar, '--')
      .input('nombre', sql.VarChar, 'Sin establecer')
      .input('economico', sql.VarChar, sucursal)
      .input('ingresponsable', sql.VarChar, nickname)
      .query(`
        INSERT INTO sucursales (canal, nombre, economico, ingresponsable)
        VALUES (@canal, @nombre, @economico, @ingresponsable)
      `);

    // Ubicacion
    await ingresarDatos
      .input('economico', sql.VarChar, sucursal)
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