/* CONTROLADORES DE INFORMATIVA -- USUARIO */
import { fileTypeFromBuffer } from "file-type";
import { schemas as SC } from "../../validators/Informativas/UsuarioInfoVal.js";
import { services as SR } from "../../services/Informativas/UsuarioInfoSer.js";

// Pedir la lista de usuarios
const getListaUsuarios = async (req, res) => {
  const tipo = req.session.tipo;
  if (tipo === "Super Administrador") {
    try {
      const lista = await SR.obtenerListaUsuarios();
      return res.status(200).json(lista)
    } catch (error) {
      console.error('Error: // Pedir la lista de usuarios, ', error);
      return res.status(error?.code || 500).json({ message: error?.message || 'Error al obtener los usuarios' });
    }
  }
  else {
    return res.sendStatus(401);
  }
};

// Pedir los datos del personal
const getDatosSeleccionado = async (req, res) => {
  try {
    let seleccionado;
    const tipo = req.session.tipo;
    tipo !== "Super Administrador" ? seleccionado = req.session.perfil : seleccionado = req.params.nickname;
    const datos = await SR.obtenerDatosSeleccionado(seleccionado);
    return res.status(200).json(datos);
  } catch (error) {
    console.error('Error: // Pedir los datos del personal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener los datos del personal" });
  }
};

// Pedir la foto del personal
const getFotoSeleccionado = async (req, res) => {
  try {
    let seleccionado;
    const tipo = req.session.tipo;
    tipo !== "Super Administrador" ? seleccionado = req.session.perfil : seleccionado = req.params.nickname;
    const archivo = await SR.obtenerFotoSeleccionado(seleccionado);
    if (!archivo.foto) {
      return res.status(404).json({ code: 404, message: 'Sin foto' });
    }
    // Detectar MIME real desde el buffer
    const tipoDetectado = await fileTypeFromBuffer(archivo.foto);
    // Si no detecta, usa JPEG como fallback
    const mime = tipoDetectado?.mime || "image/jpeg";
    const extension = tipoDetectado?.ext || "jpg";
    // Enviar con el tipo correcto
    res.set("Content-Type", mime); // Cambia el tipo de contenido a JPEG
    res.set("Content-Disposition", `inline; filename="foto.${extension}"`); // Cambia el nombre del archivo a descargar
    res.status(200).send(archivo.foto);
  } catch (error) {
    console.error('Error: // Pedir la foto del personal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error al obtener la foto del personal" });
  }
};

// Editar los datos del personal
const editDataPersonal = async (req, res) => {
  try {
    let { propiedadEditar, valor, id } = req.body;
    if (typeof valor === 'string') {
      valor = valor.trim();
    }
    const validar = { [propiedadEditar]: valor, id };
    const { error, value } = SC.SchemaActualizarUsuario.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await SR.editarDatosPersonal(value);
    return res.status(200).json({ ok: true, message: `Cambio correcto de ${propiedadEditar}` });
  } catch (error) {
    console.error('Error: // Editar los datos del personal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error editando personal' });
  }
};

// Editar la foto del personal
const editFotoPersonal = async (req, res) => {
  try {
    const foto = req.file.buffer; // Obtiene el archivo como un buffer
    const id = req.body.id;
    await SR.editarFotoPersonal(foto, id);
    return res.sendStatus(200);
  } catch (error) {
    console.error('Error: // Editar la foto del personal, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error editando foto' });
  }
};

export const controllers = {
  getListaUsuarios,
  getDatosSeleccionado,
  getFotoSeleccionado,
  editDataPersonal,
  editFotoPersonal,
};