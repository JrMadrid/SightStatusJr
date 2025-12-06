/* CONTROLADORES DE PANEL DE DISPOSITIVOS */
import { services as SR } from '../../services/Paneles/panelDispositivosSer.js';
import { schemas as SC } from '../../validators/Paneles/panelDispositivosVal.js';
import pingHost from '../../../connection/PING.js';

// Pedir los datos de los dispositivos
const getDatosDispositivos = async (req, res) => {
  try {
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const dispositivos = await SR.obtenerDatosDispositivos(responsable, tipo);
    res.status(200).json(dispositivos);
  } catch (error) {
    console.error('Error: // Pedir los datos de los dispositivos, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error pidiendo los datos de los dispositivos' });
  }
};

// Pedir la lista de los dispositivos
const getListaDispositivos = async (req, res) => {
  try {
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const lista = await SR.obtenerListaDispositivos(responsable, tipo);
    res.status(200).json(lista);
  } catch (error) {
    console.error('Error: // Pedir la lista de los dispositivos, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error pidiendo la lista de los dispositivos" });
  }
};

// Agregar un nuevo dispositivo
const postDispositivo = async (req, res) => {
  try {
    const { error, value } = SC.SchemaCrearDispositivo.validate(req.body, { abortEarly: false });
    // .validate sirve para validar el objeto y devuelve un objeto con error si hay problemas; abortEarly: false para obtener todos los errores, no solo el primero
    if (error) {
      const erroresUnidos = error.details.map(err => err.message).join('\n'); // Unimos todos los mensajes de error en un solo string, separados por saltos de línea
      // console.log(error.details.map(e => e.type)); // Esto imprime los tipos de error
      return res.status(400).json({ message: erroresUnidos });
    }
    await SR.agregarDispositivo(value);
    res.status(200).json({ message: 'Dispositivo agregado exitosamente' });
  } catch (error) {
    console.error('Error: // Agregar un nuevo dispositivo, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error agregando el dispositivo' });
  }
};

// Actualizar un dispositivo 
const updateDispositivo = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const validar = { id: req.params.id, ...req.body };
    const { error, value } = SC.SchemaActualizarDispositivo.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.actualizarDispositivo(value);
    res.status(200).json({ message: 'Dispositivo actualizado exitosamente' });
  } catch (error) {
    console.error('Error: // Actualizar un dispositivo, ', error);
    const status = Number(error?.code);
    res.status(status >= 400 && status < 600 ? status : 500).json({ message: error?.message || 'Error actualizando los datos del dispositivo' });
  }
};

// Eliminar un dispositivo
const deleteDispositivo = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id;
    const { error, value } = SC.SchemaEliminarDispositivo.validate({ id }, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.eliminarDispositivo(value);
    res.status(200).json({ message: 'Dispositivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error: // Eliminar un dispositivo, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error eliminando el dispositivo' });
  }
};

// Hacer un ping a la ip 
const ping = async (req, res) => {
  try {
    const host = req.params.ip;
    const result = await pingHost(host);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en ping:', error);
    res.status(500).json({ message: 'Error al hacer ping' });
  }
};

export const controllers = {
  getDatosDispositivos,
  getListaDispositivos,
  postDispositivo,
  updateDispositivo,
  deleteDispositivo,
  ping
};