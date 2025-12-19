/* OPERACIONES SQL DE INFORMATIVA -- USUARIO */
import sql from 'mssql';

// Pedir la lista de usuarios
const getListaUsuarios = async () => {
  const request = new sql.Request();
  const result = await request.query(`
    SELECT u.nickname, p.telefono
    FROM users AS u
    INNER JOIN personal p on u.nickname = p.nickname 
    ORDER BY u.id
    `);
  return result.recordset;
};

// Pedir los datos del personal
const getDatosSeleccionado = async (seleccionado, existe) => {
  const request = new sql.Request();
  if (!existe) {
    await request.query(`INSERT INTO personal (nickname) VALUES ('${seleccionado}')`);
  }
  request.input('seleccionado', sql.VarChar, seleccionado);
  const result = await request.query(`
    SELECT id ,nickname ,cedula ,localidad ,fecha_nacimiento ,sexo ,fecha_contratacion ,descripcion ,grado_academico ,puesto, nombre, telefono
    FROM personal
    WHERE nickname = @seleccionado
    `);
  return result.recordset[0];
};

// Pedir la foto del personal
const getFotoSeleccionado = async (seleccionado) => {
  const request = new sql.Request();
  request.input('seleccionado', sql.VarChar, seleccionado);
  const result = await request.query(`
    SELECT foto
    FROM personal
    WHERE nickname = @seleccionado
    `);
  return result.recordset[0];
};

// Editar los datos del personal
const editDataPersonal = async (propiedadEditar, valor, id) => {
  let sqlType;
  let valorSQL = valor;
  switch (propiedadEditar) {
    case 'nombre':
    case 'telefono':
    case 'localidad':
    case 'grado_academico':
    case 'puesto':
    case 'cedula':
    case 'descripcion':
      sqlType = sql.NVarChar;
      break;
    case 'fecha_nacimiento':
    case 'fecha_contratacion':
      sqlType = sql.Date;
      break;
    case 'sexo':
      sqlType = sql.Char;
      break;
    case 'activo':
      sqlType = sql.Bit;
      break;
    case 'BorrarFoto':
      propiedadEditar = 'foto';
      sqlType = sql.VarBinary(sql.MAX);
      valorSQL = null; // SET foto = NULL
      break;
    default:
      throw new Error('Columna desconocida');
  }
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  request.input('valor', sqlType, valorSQL);
  await request.query(`
    UPDATE personal
    SET ${propiedadEditar} = @valor
    WHERE id = @id
  `);
};

// Editar la foto del personal
const editFotoPersonal = async (foto, id) => {
  const request = new sql.Request();
  request.input('foto', sql.VarBinary(sql.MAX), foto);
  request.input('id', sql.Numeric, id);
  await request.query(`
    UPDATE personal
    SET foto = @foto
    WHERE id = @id
    `);
};

export const operaciones = {
  getListaUsuarios,
  getDatosSeleccionado,
  getFotoSeleccionado,
  editDataPersonal,
  editFotoPersonal,
};