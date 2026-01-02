/* VERIFICACIONES SQL DE PANEL DE MANTENIMIENTOS */
import sql from 'mssql';

// Verificar que existe la sucursal antes de cualquier operación con los mantenimientos
const SucursalExiste = async (economico) => {
  try {
    const query = 'SELECT economico FROM sucursales WHERE economico = @economico';
    const request = new sql.Request();
    request.input('economico', sql.VarChar, economico);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // La sucursal existe
  } catch (error) {
    console.error('Error: // Verificar que existe la sucursal antes de cualquier operación con los mantenimientos, ', error);
  }
};

// Verificar que fecha estimada es mayor a 01/Enero/2024
const comprobarFechaEstimada = async (festimada) => {
  try {
    const fechaLimite = new Date('2024-01-01');
    const fechaIngresada = new Date(festimada);
    return fechaIngresada > fechaLimite;
  } catch (error) {
    console.error('Error: // Verificar que fecha estimada es mayor a 01/Enero/2024, ', error);
    return false;
  }
};

// Verificar que fecha realizada es mayor que fecha estimada
const comprobarFechaRealizada = async (frealizada, id) => {
  try {
    const query = 'SELECT fechaestimada FROM mantenimientos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.Numeric, id);
    const response = await request.query(query);
    let fechaestimada = response.recordset[0].fechaestimada;
    return fechaestimada < frealizada;
  } catch (error) {
    console.error('Error: // Verificar que fecha realizada es mayor que fecha estimada, ', error);
  }
};

// Verificar que la fecha ya tenga mantenimiento
const ConstanciaExiste = async (id) => {
  try {
    const query = 'SELECT constancia FROM mantenimientos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset[0].constancia !== null;// Ya tiene mantenimiento
  } catch (error) {
    console.error('Error: // Verificar que la fecha ya tenga mantenimiento, ', error);
  }
};

// Verificar que el mantenimiento es de su sucursal - geografia
const comprobarSuMantenimiento = async (id, responsable) => {
  try {
    const query = 'SELECT sucu.ingresponsable AS ingeniero FROM mantenimientos mante INNER JOIN sucursales sucu ON sucu.economico = mante.economico WHERE mante.id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    const ingeniero = resultado.recordset[0].ingeniero;
    return responsable.toLowerCase() === ingeniero.toLowerCase(); // Si es su mantenimiento
  } catch (error) {
    console.error('Error: // Verificar que el mantenimiento es de su sucursal - geografia, ', error);
  }
};

// Saber el economico
const ecoSucursal = async (id) => {
  try {
    const query = 'SELECT economico FROM mantenimientos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset[0].economico;
  } catch (error) {
    console.error('Error: // Saber el economico, ', error);
  }
};

// Siguiente estimado
const nextFEstimada = async (yy, mm) => {
  let siguiFEstimada = '';
  if (6 < mm) {
    yy = yy + 1;
    // 'segundo semestre, le toca el primer semestre del otro año'
    siguiFEstimada = `${yy}-01-01`;
  } else {
    // 'primer semestre, le toca el segundo semestre del mismo otro año'
    siguiFEstimada = `${yy}-07-01`;
  }
  return siguiFEstimada;
};

// Verificar que ID del dispositivo existe para corrobar ejecución
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM mantenimientos WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0; // El ID exite
  } catch (error) {
    console.error('Error: // Verificar que ID del dispositivo existe para corrobar ejecución, ', error);
  }
};

export const verificaciones = {
  SucursalExiste,
  comprobarFechaEstimada,
  comprobarFechaRealizada,
  ConstanciaExiste,
  comprobarSuMantenimiento,
  ecoSucursal,
  nextFEstimada,
  comprobarID
};