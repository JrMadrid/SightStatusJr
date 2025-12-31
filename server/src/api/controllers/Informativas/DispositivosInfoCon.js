/* CONTROLADORES DE INFORMATIVA -- DISPOSITIVOS */
import { schemas as SC } from '../../schemas/Informativas/DipositivosInfoSch.js';
import { validators as VL } from '../../validators/Informativas/DispositivosInfoVal.js';

// Mandar los dispositivos con ese nombre
const getDispositivosNombre = async (req, res) => {
  try {
    if (!req.params.nombre) {
      return res.status(400).json({ message: "Nombre requerido" });
    }
    const validar = { nombre: req.params.nombre };
    const { error, value } = SC.SchemaPedirDispositivos.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const dispositivo = value.nombre;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const result = await VL.dispositivosNombre(dispositivo, responsable, tipo);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error: // Mandar los dispositivos con ese nombre, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los dispositivos" });
  }
};

// Pedir los datos de los dispositivos
const getInfoDispositivos = async (req, res) => {
  try {
    if (!req.params.nombre) {
      return res.status(400).json({ message: "Nombre requerido" });
    }
    const validar = { nombre: req.params.nombre };
    const { error, value } = SC.SchemaPedirDispositivos.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const dispositivo = value.nombre;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const result = await VL.infoDispositivo(dispositivo, responsable, tipo);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error: // Pedir los datos de los dispositivos, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los datos de los dispositivos" });
  }
};

export const controllers = {
  getDispositivosNombre,
  getInfoDispositivos
};