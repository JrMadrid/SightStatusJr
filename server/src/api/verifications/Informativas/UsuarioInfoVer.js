/* VERIFICACIONES SQL DE INFORMATIVA -- USUARIO */
import sql from 'mssql';

// Verificar si el usuario existe
const UsuarioExiste = async (seleccionado) => {
  try {
    const query = 'SELECT nickname FROM personal WHERE nickname = @seleccionado';
    const request = new sql.Request();
    request.input('seleccionado', sql.VarChar, seleccionado);
    const response = await request.query(query);
    return response.recordset.length > 0; // El usuario existe
  } catch (error) {
    console.error('Error: // Verificar si el usuario existe, ', error);
  }
};

export const verificaciones = {
  UsuarioExiste
};