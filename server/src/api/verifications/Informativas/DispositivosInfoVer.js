/* VERIFICACIONES SQL DE INFORMATIVA -- DISPOSITIVOS */
import sql from 'mssql';

// Verificar que existe el dipositivo
const dipositivoExiste = async (dispositivo) => {
  try {
    const query = 'SELECT nombre FROM dispositivos WHERE nombre = @dispositivo';
    const request = new sql.Request();
    request.input('dispositivo', sql.VarChar, dispositivo);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;  // El dispositivo existe
  } catch (error) {
    console.error('Error: // Verificar que existe el dipositivo, ', error);
  }
};

export const verificaciones = {
  dipositivoExiste
};