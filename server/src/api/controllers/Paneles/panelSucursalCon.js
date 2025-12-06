/* CONTROLADORES DE PANEL DE SUCURSALES */
import { schemas as SC } from '../../validators/Paneles/panelSucursalVar.js';
import { services as SR } from '../../services/Paneles/panelSucursalSer.js';

// Pedir los datos de las sucursales
const getSucursales = async (req, res) => {
  try {
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const sucursales = await SR.obtenerSucursales(responsable, tipo);
    res.status(200).json(sucursales);
  } catch (error) {
    console.error('Error: // Pedir los datos de las sucursales, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los datos de las sucursales" });
  }
};

// Agregar una nueva sucursal
const postSucursal = async (req, res) => {
  try {
    const { error, value } = SC.SchemaCrearSucursal.validate(req.body, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.agregarSucursal(value);
    res.status(200).json({ message: 'Sucursal agregada exitosamente' });
  } catch (error) {
    console.error('Error: // Agregar una nueva sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error agregando nuevos datos' });
  }
};

// Actualizar una sucursal
const updateSucursal = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const validar = { id: req.params.id, ...req.body };
    const { error, value } = SC.SchemaActualizarSucursal.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.actualizarSucursal(value);
    res.status(200).json({ message: 'Sucursal actualizada exitosamente' });
  } catch (error) {
    console.error('Error: // Actualizar una sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error actualizando datos' });
  }
};

// Eliminar una sucursal
const deleteSucursal = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id;
    const { error, value } = SC.SchemaEliminarSucursal.validate({ id }, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.eliminarSucursal(value);
    res.status(200).json({ message: 'Sucursal eliminada exitosamente' });
  } catch (error) {
    console.error('Error: // Eliminar una sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error eliminando datos' });
  }
};

export const controllers = {
  getSucursales,
  postSucursal,
  updateSucursal,
  deleteSucursal
};