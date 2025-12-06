/* CONTROLADORES DE PANEL DE MANTENIMIENTOS */
import { schemas as SC } from '../../validators/Paneles/panelMantenimientoVal.js';
import { services as SR } from '../../services/Paneles/panelMantenimientoSer.js';

// Pedir los datos de los mantenimientos
const getMantenimientos = async (req, res) => {
  try {
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const mantenimientos = await SR.obtenerMantenimientos(responsable, tipo);
    res.status(200).json(mantenimientos);
  } catch (error) {
    console.error('Error: // Pedir los datos de los mantenimientos, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con los mantenimientos' });
  }
};

// Agregar un nuevo mantenimiento
const postMantenimiento = async (req, res) => {
  try {
    const { error, value } = SC.SchemaAgregarMantenimiento.validate(req.body, { abortEarly: false });
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: erroresUnidos });
    }
    await SR.publicarMantenimiento(value);
    res.status(200).json({ message: 'Mantenimiento agregado exitosamente' });
  } catch (error) {
    res.status(500 || error?.code).json({ message: error?.message || 'Error agregando nuevo mantenimiento' });
    console.error('Error: // Agregar un nuevo mantenimiento, ', error);
  }
};

// Agregar constancia de mantenimiento
const postConstancia = async (req, res) => {
  try {
    const imagen = req.file.buffer; // Obtiene el archivo como un buffer
    const responsable = req.session.user;
    const { error, value } = SC.SchemaAgregarConstanciaMantenimiento.validate(req.body, { abortEarly: false });
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      res.status(400).json({ message: erroresUnidos })
    }
    await SR.publicarConstancia(value, { imagen, responsable });
    res.status(200).json({ message: 'Mantenimiento agregado exitosamente' }); // Responder con éxito
  } catch (error) {
    console.error('Error: // Agregar constancia de mantenimiento, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error agregando nuevo mantenimiento' }); // Responder con falla
  }
};

// Actualizar un mantenimiento
const updateMantenimiento = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const validar = { id: req.params.id, ...req.body };
    const { error, value } = SC.SchemaActualizarMantenimiento.validate(validar, { abortEarly: false });
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: erroresUnidos });
    }
    await SR.actualizarMantenimiento(value);
    res.status(200).json({ message: 'Mantenimiento actualizado exitosamente' });
  } catch (error) {
    console.error('Error: // Actualizar un mantenimiento, ', error);
    res.status(500 || error?.code).json({ message: error?.message || 'Error actualizando nuevo mantenimiento' });
  }
};

// Eliminar un mantenimiento
const deleteMantenimiento = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id
    const { error, value } = SC.SchemaEliminarMantenimiento.validate({ id }, { abortEarly: false });
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: erroresUnidos });
    }
    await SR.eliminarMantenimiento(value);
    res.status(200).json({ message: 'Mantenimiento eliminado exitosamente' });
  } catch (error) {
    console.error('Error // Eliminar un mantenimiento, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error eliminando datos' });
  }
};

export const controllers = {
  getMantenimientos,
  postMantenimiento,
  postConstancia,
  deleteMantenimiento,
  updateMantenimiento
};