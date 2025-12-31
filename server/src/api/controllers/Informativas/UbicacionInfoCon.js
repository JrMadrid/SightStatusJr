/* CONTROLADORES DE INFORMATIVA -- UBICACIÓN */
import { fileTypeFromBuffer } from "file-type";
import { schemas as SC } from "../../schemas/Informativas/UbicacionInfoSch.js";
import { validators as VL } from "../../validators/Informativas/UbicacionInfoVal.js";

// Verificar el economico antes de cualquier consulta
const getVerificarEconomico = async (req, res) => {
  try {
    if (!req.params.economico) {
      return res.status(400).json({ message: "Económico requerido" });
    }
    const validar = { economico: req.params.economico };
    const { error, value } = SC.SchemaPedirUbicacion.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const economico = value.economico;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    await VL.pedirVerificarEconomico(economico, responsable, tipo);
    return res.status(200).json({ validez: true });
  } catch (error) {
    console.error('Error: // Pedir los datos de la ubicación de la sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Ubicación no encontrada' });
  }
};

// Pedir los datos de la ubicación de la sucursal
const getUbicacionDatos = async (req, res) => {
  try {
    if (!req.params.economico) {
      return res.status(400).json({ message: "Económico requerido" });
    }
    const validar = { economico: req.params.economico };
    const { error, value } = SC.SchemaPedirUbicacion.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const economico = value.economico;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const mapa = await VL.pedirUbicacionDatos(economico, responsable, tipo);
    if (!mapa) {
      return res.sendStatus(404);
    }
    return res.status(200).json(mapa);
  } catch (error) {
    console.error('Error: // Pedir los datos de la ubicación de la sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Ubicación no encontrada' });
  }
};

// Pedir la imagen de la ubicación de la sucursal
const getUbicacionFoto = async (req, res) => {
  try {
    if (!req.params.economico) {
      return res.status(400).json({ message: "Económico requerido" });
    }
    const validar = { economico: req.params.economico };
    const { error, value } = SC.SchemaPedirUbicacion.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const economico = value.economico;
    const responsable = req.session.user;
    const tipo = req.session.tipo;
    const archivo = await VL.pedirUbicacionFoto(economico, responsable, tipo);
    if (!archivo.imagen) {
      return res.status(404).json({ code: 404, message: 'Sin imagen' });
    }
    // Detectar MIME real desde el buffer
    const tipoDetectado = await fileTypeFromBuffer(archivo.imagen);
    // Si no detecta, usa JPEG como fallback
    const mime = tipoDetectado?.mime || "image/jpeg";
    const extension = tipoDetectado?.ext || "jpg";
    // Enviar con el tipo correcto
    res.set("Content-Type", mime); // Cambia el tipo de contenido a JPEG
    res.set("Content-Disposition", `inline; filename="imagen.${extension}"`); // Cambia el nombre del archivo a descargar
    res.status(200).send(archivo.imagen);
  } catch (error) {
    console.error('Error: // Pedir la imagen de la ubicación de la sucursal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Ubicación no encontrada' });
  }
};

// Editar los datos de la ubicación
const updateDatosUbicacion = async (req, res) => {
  try {
    const { propiedadEditar, valor, economico } = req.body;
    const validar = { [propiedadEditar]: valor, economico };
    const { error, value } = SC.SchemaActualizarUbicacion.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await VL.editarDatosUbicacion(value);
    return res.status(200).json({ ok: true, message: `Cambio correcto de ${propiedadEditar}` });
  } catch (error) {
    console.error('Error: // Editar los datos de la ubicación, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error editando los datos de la ubicación' });
  }
};

// Editar la imagen de la ubicación
const updateImagenUbicacion = async (req, res) => {
  try {
    const imagen = req.file.buffer; // Obtiene el archivo como un buffer
    const economico = req.body.economico;
    await VL.editarImagenUbicacion(imagen, economico);
    return res.status(200).json({ ok: true, message: `Cambio correcto de imagen` });
  } catch (error) {
    console.error('Error: // Editar la imagen de la ubicación, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error editando la imagen de la ubicación' });
  }
};

export const controllers = {
  getVerificarEconomico,
  getUbicacionDatos,
  getUbicacionFoto,
  updateDatosUbicacion,
  updateImagenUbicacion
};