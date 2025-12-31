/* CONTROLADORES DE INFORMATIVA -- MANUAL */
import { validators as VL } from '../../validators/Informativas/ManualInfoVal.js';

// Mandar los datos del manual
const manualinfo = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const manualid = req.params.id;
    const manualinfo = await VL.obtenerDatosManual(manualid);
    return res.status(200).json(manualinfo);
  } catch (error) {
    console.error('Error: // Mandar los datos del manual, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con los datos del manual' });
  }
};

// Mandar el manual
const manual = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const manualid = req.params.id;
    let manualAr = await VL.obtenerArchivoManual(manualid);
    if (!manualAr.manual) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/pdf'); // Cambia el tipo de contenido a PDF
    res.set('Content-Disposition', `inline; filename="manual.pdf"`); // Cambia el nombre del archivo a descargar
    res.status(200).send(manualAr.manual);
  } catch (error) {
    console.error('Error: // Mandar el manual, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error interno' }); // Responder con falla
  }
};

export const controllers = {
  manualinfo,
  manual
};