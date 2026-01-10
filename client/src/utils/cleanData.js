/* LIMPIEZA DE DATOS */
const cleanData = (data) => {
  // Crear objeto limpio sin mutar el estado
  const cleaned = {};

  for (const key in data) {
    let value = data[key];

    if (typeof value === 'string') {
      value = value.trim();
    }

    if (value !== '' && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }

  return cleaned;
};

export default cleanData;