/* VERIFICACIONES SQL DE PANEL DE MANUALES */
import sql from 'mssql';

// Verificar que ID del manual existe para corrobar ejecución
const comprobarID = async (id) => {
  try {
    const query = 'SELECT id FROM manuales WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.VarChar, id);
    const resultado = await request.query(query);
    return resultado.recordset.length > 0;
  } catch (error) {
    console.error('Error al comprobar el ID:', error);
  }
};

export const verificaciones = {
  comprobarID
};