/* OPERACIONES SQL DE INFORMATIVA -- UBICACIÓN */
import sql from 'mssql';

// Verificar el economico antes de cualquier consulta, se crea si no existe
const getVerificarEconomico = async (economico) => {
  const request = new sql.Request();
  const query = `INSERT INTO ubicacion (economico) VALUES ('${economico}')`;
  request.input('economico', sql.VarChar, economico);
  await request.query(query);
};

// Pedir los datos de la ubicación de la sucursal
const getUbicacionDatos = async (economico, responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
          SELECT ubi.id AS id, ubi.economico AS economico, ubi.latitud AS latitud, ubi.longitud AS longitud, ubi.direccion AS direccion, ubi.actualizado AS actualizado, ubi.descripcion AS descripcion,
                  sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable
          FROM ubicacion ubi
          INNER JOIN sucursales sucu ON ubi.economico = sucu.economico
          WHERE ubi.economico = @economico AND sucu.ingresponsable = @responsable
      `;
  } else {
    query = `
          SELECT ubi.id AS id, ubi.economico AS economico, ubi.latitud AS latitud, ubi.longitud AS longitud, ubi.direccion AS direccion, ubi.actualizado AS actualizado, ubi.descripcion AS descripcion,
                sucu.nombre AS sucursal, sucu.ingresponsable AS ingresponsable
          FROM ubicacion ubi
          INNER JOIN sucursales sucu ON ubi.economico = sucu.economico
          WHERE ubi.economico = @economico
      `;
  }
  request.input('economico', sql.VarChar, economico);
  request.input('responsable', sql.VarChar, responsable);
  return (await request.query(query)).recordset[0];
};

// Pedir la imagen de la ubicación de la sucursal
const getUbicacionFoto = async (economico, responsable, tipo) => {
  const request = new sql.Request();
  let query;
  if (tipo === 'Geografia') {
    query = `
          SELECT ubi.imagen AS imagen
          FROM ubicacion ubi
          INNER JOIN sucursales sucu ON ubi.economico = sucu.economico
          WHERE ubi.economico = @economico AND sucu.ingresponsable = @responsable
      `;
  } else {
    query = `
          SELECT ubi.imagen AS imagen
          FROM ubicacion ubi
          WHERE ubi.economico = @economico
      `;
  }
  request.input('economico', sql.VarChar, economico);
  request.input('responsable', sql.VarChar, responsable);
  return (await request.query(query)).recordset[0];
};

// Editar los datos de la ubicación
const updateDatosUbicacion = async (propiedadEditar, valor, economico) => {
  let sqlType;
  let valorSQL = valor;
  switch (propiedadEditar) {
    case 'direccion':
    case 'descripcion':
      sqlType = sql.NVarChar;
      break;
    case 'latitud':
    case 'longitud':
      sqlType = sql.Decimal;
      break;
    case 'actualizado':
      sqlType = sql.DateTime;
      break;
    case 'BorrarImagen':
      propiedadEditar = 'imagen';
      sqlType = sql.VarBinary(sql.MAX);
      valorSQL = null; // SET imagen = NULL
      break;
    default:
      throw new Error("Columna desconocida");
  }
  const request = new sql.Request();
  request.input('economico', sql.VarChar, economico);
  request.input('valor', sqlType, valorSQL);
  await request.query(`
  UPDATE ubicacion
  SET ${propiedadEditar} = @valor
  WHERE economico = @economico
  `);
};

// Editar la imagen de la ubicación
const updateImagenUbicacion = async (imagen, economico) => {
  const request = new sql.Request();
  request.input('imagen', sql.VarBinary(sql.MAX), imagen);
  request.input('economico', sql.VarChar, economico);
  await request.query(`
    UPDATE ubicacion
    SET imagen = @imagen
    WHERE economico = @economico
    `);
};

export const operaciones = {
  getVerificarEconomico,
  getUbicacionDatos,
  getUbicacionFoto,
  updateDatosUbicacion,
  updateImagenUbicacion
};