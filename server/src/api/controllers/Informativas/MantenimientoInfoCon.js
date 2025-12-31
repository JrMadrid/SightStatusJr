/* CONTROLADORES DE INFORMATIVA -- MANTENIMIENTO */
import { schemas as SC } from '../../schemas/Informativas/MantenimientoInfoSch.js';
import { validators as VL } from '../../validators/Informativas/MantenimientoInfoVal.js';

const getFechasRealizadas = async (req, res) => {
  // Mandar las fechas vinculadas al economico
  try {
    if (!req.params.economico) {
      return res.status(400).json({ message: "Económico requerido" });
    }
    const validar = { economico: req.params.economico };
    const { error, value } = SC.SchemaPedirMantenimiento.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const economico = value.economico;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const fechasr = await VL.PedirFechasRealizadas(economico, responsable, tipo);
    return res.status(200).json(fechasr);
  } catch (error) {
    console.error('Error: // Manda las fechas vinculadas al economico, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Fechas no encontradas' });
  }
};

// Mandar el documento del mantemiento seleccionado
const getFechaSeleccionada = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id;
    if (id === '0') throw { code: 404, message: 'Mantenimiento no válido' };
    const mantenimiento = await VL.PedirFechaSeleccionada(id);
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
const getMantenimientoArchivo = async (req, res) => {
  try {
    if (!req.params.fechasr) {
      return res.status(400).json({ message: "Fecha requerida" });
    }
    const fechasr = req.params.fechasr;
    if (fechasr && fechasr !== null && fechasr !== 'null') {
      const constanciaArchivo = await VL.obtenerArchivoMantenimiento(fechasr);
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
const getMantenimientosArchivos = async (req, res) => {
  try {
    if (!req.params.economico) {
      return res.status(400).json({ message: "Económico requerido" });
    }
    const economico = req.params.economico;
    const constancias = await VL.obtenerArchivosMantenimientos(economico);
    res.status(200).json(constancias);
  } catch (error) {
    console.error('Error: // Mandar todas las constancias, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error interno' });
  }
};

export const controllers = {
  getFechasRealizadas,
  getFechaSeleccionada,
  getMantenimientoArchivo,
  getMantenimientosArchivos
};