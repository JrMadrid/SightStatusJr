/* CONTROLADORES DE INFORMATIVA --  INFORMES */
import { obtenerInfoInforme, obtenerArchivoInforme } from '../../services/Informativas/InformeInfoSer.js';

// Mandar los datos del informe
const informeinfo = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = await obtenerInfoInforme(id);
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error: // Mandar los datos del informe, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con los datos' });
  }
};

// Mandar el informe
const informe = async (req, res) => {
  try {
    const id = req.params.id;
    const documento = await obtenerArchivoInforme(id);
    if (!documento.informe) {
      res.sendStatus(404);
    }
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `inline; filename="informe.pdf"`);
    res.status(200).send(documento.informe);
  } catch (error) {
    console.error('Error: // Mandar el informe, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error con el documento  ' });
  }
};

export const methods = { informeinfo, informe };