/* CONTROLADORES DE INFORMATIVA -- MANTENIMIENTO */
import { fechaMantenimientoSeleccionado, fechasMantenimientosRealizados, obtenerArchivoMantenimiento, obtenerArchivosMantenimientos } from '../../services/Informativas/ManteInfoSer.js';

// Mandar las fechas vinculadas al economico
const fechasr = async (req, res) => {
  try {
    const economico = req.params.economico; // Obtiene el número económico de la URL    
    const fechasr = await fechasMantenimientosRealizados(economico)
    return res.status(200).json(fechasr);
  } catch (error) {
    console.error('Error: // Manda las fechas vinculadas al economico, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Fechas no encontradas' });
  }
};

// Mandar el documento del mantemiento seleccionado
const mantenimientoSeleccionado = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === '0') throw { code: 404, message: 'Mantenimiento no valido' };

    const mantenimiento = await fechaMantenimientoSeleccionado(id);
    if (!mantenimiento.constancia) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'image/jpeg'); // Cambia el tipo de contenido a JPEG
    res.set('Content-Disposition', `inline; filename="constancia.jpg"`); // Cambia el nombre del archivo a descargar
    res.status(200).send(mantenimiento.constancia);

  } catch (error) {
    console.error('Error: // Mandar el documento del mantemiento seleccionado, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Constancia no encontrado' });
  }
};

// Mandar el archivo de la constancia de la fecha seleccionada
const info = async (req, res) => {
  try {
    const fechasr = req.params.fechasr;

    if (fechasr && fechasr !== null && fechasr !== 'null') {
      const constanciaArchivo = await obtenerArchivoMantenimiento(fechasr);
      if (!constanciaArchivo.constancia) {
        return res.sendStatus(404);
      }
      res.set('Content-Type', 'image/jpeg'); // Cambia el tipo de contenido a JPEG
      res.set('Content-Disposition', `inline; filename="constancia.jpg"`); // Cambia el nombre del archivo a descargar
      res.status(200).send(constanciaArchivo.constancia);
    } else {
      return res.status(400).json({ message: 'Fecha no valida' });
    }
  } catch (error) {
    console.error('Error: // Manda el archivo de la constancia de la fecha seleccionada, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Mantenimiento no encontrado' }); // Responder con falla
  }
};

// Mandar todas las constancias
const infos = async (req, res) => {
  try {
    const economico = req.params.economico;
    const constancias = await obtenerArchivosMantenimientos(economico);
    res.status(200).json(constancias);
  } catch (error) {
    console.error('Error: // Mandar todas las constancias, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error interno' });
  }
};

export default { mantenimientoSeleccionado, fechasr, info, infos };