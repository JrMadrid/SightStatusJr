/* CONTROLADORES DE INFORMATIVA -- DISPOSITIVOS */
import { dispositivosNombre, infoDispositivo } from '../../services/Informativas/DispositivosInfoSer.js';

// Mandar los dispositivos con ese nombre
const getDispositivosNombre = async (req, res) => {
  try {
    const dispositivo = req.params.nombre;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const result = await dispositivosNombre(dispositivo, responsable, tipo);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error: // Mandar los dispositivos con ese nombre, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los dispositivos" });
  }
};

// Pedir los datos de los dispositivos
const getInfoDispositivos = async (req, res) => {
  try {
    const dispositivo = req.params.dispo;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const result = await infoDispositivo(dispositivo, responsable, tipo);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error: // Pedir los datos de los dispositivos, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los datos de los dispositivos" });
  }
};

export const methods = { getDispositivosNombre, getInfoDispositivos };