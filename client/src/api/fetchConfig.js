/* CONFIGURACIÓN GLOBAL DE FETCH */
// Función asíncrona para obtener datos desde una URL
const fetchData = async (url) => {
  try {
    const response = await fetch(url, { credentials: 'include' }); // Incluye cookies

    // Intentamos parsear JSON aunque sea un error
    let data;
    try {
      data = await response.json();
    } catch {
      data = null; // Si no es JSON, dejamos null
    }

    // Si la respuesta NO es 2xx, lanzamos error con mensaje del backend si existe
    if (!response.ok) {
      const message = data?.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(message);
    }

    // Devuelve los datos ya parseados
    return data;

  } catch (error) {
    throw error; // Relanzamos el error para que el frontend lo capture
  }
};

export default fetchData;