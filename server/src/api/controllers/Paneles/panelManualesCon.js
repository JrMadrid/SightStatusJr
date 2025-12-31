/* CONTROLADORES DE PANEL DE MANUALES */
import { schemas as SC } from '../../schemas/Paneles/panelManualesSch.js';
import { validators as VL } from '../../validators/Paneles/panelManualVal.js';

// Pedir los datos de los manuales
const getManuales = async (req, res) => {
  try {
    const manuales = await VL.obtenerManuales();
    res.status(200).json(manuales);
  } catch (error) {
    console.error('Error: // Pedir los datos de los manuales, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con los datos' });
  }
};

// Agregar un nuevo manual
const postManual = async (req, res) => {
  try {
    const manual = req.file.buffer;
    const { error, value } = SC.SchemaAgregarManual.validate(req.body, { abortEarly: false })
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      res.status(400).json({ message: erroresUnidos })
    }
    await VL.publicarManual(value, manual);
    res.status(200).json({ message: 'Manual agregado exitosamente' });
  } catch (error) {
    console.error('Error: // Agregar un nuevo manual, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error agregando nuevos manual' }); // Responder con falla
  }
};

// Actualizar un manual
const updateManual = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const { error, value } = SC.schemaActualizarManual.validate({ id: req.params.id, ...req.body }, { abortEarly: false });
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      res.status(400).json({ message: erroresUnidos })
    }
    await VL.actualizarManual(value);
    res.status(200).json({ message: 'Manual actualizado exitosamente' });
  } catch (error) {
    console.error('Error: // Actualizar un manual, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error actualizando el manual' });
  }
};

// Eliminar un manual
const deleteManual = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id;
    const { error, value } = SC.SchemaEliminarManual.validate({ id }, { abortEarly: false })
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n');
      res.status(400).json({ message: erroresUnidos })
    }
    await VL.eliminarManual(value);
    res.status(200).json({ message: 'Manual eliminado exitosamente' });
  } catch (error) {
    console.error('Error: // Eliminar un manual, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error eliminando el manual' });
  }
};

// Pedir el manual en formato PDF
const Manual = async (req, res) => {
  try {
    if (!req.params.id) { return; }
    const id = req.params.id;
    const documento = await VL.manualArchivo(id);
    if (!documento.manual) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/pdf'); // Cambia el tipo de contenido a PDF
    res.set('Content-Disposition', `inline; filename="manual.pdf"`); // Cambia el nombre del archivo si es necesario
    res.status(200).send(documento.manual);
  } catch (error) {
    console.error('Error: // Pedir el manual en formato PDF, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con el manual' });
  }
};

export const controllers = {
  getManuales,
  postManual,
  updateManual,
  deleteManual,
  Manual
};