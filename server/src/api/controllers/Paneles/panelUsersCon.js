/* CONTROLADORES DE PANEL DE USUARIOS */
import { schemas as SC } from '../../schemas/Paneles/PanelUsersSch.js';
import { validators as VL } from '../../validators/Paneles/panelUsersVal.js';

// Pedir los datos de los usuarios
const getUsers = async (req, res) => {
  try {
    let usuarios = await VL.obtenerUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error: // Pedir los datos de los usuarios, ', error);
    res.status(error?.code || 500).json({ message: error?.message || "Error pidiendo los datos de los usuarios" });
  }
};

// Agregar un nuevo usuario
const postUser = async (req, res) => {
  try {
    const { error, value } = SC.SchemaCrearUsuario.validate(req.body, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    };
    await VL.agregarUser(value);
    res.status(200).json({ message: 'Usuario agregado exitosamente' });
  } catch (error) {
    console.error('Error: // Agregar un nuevo usuario, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error agregando usuario' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const validar = { id: req.params.id, ...req.body };
    const { error, value } = SC.SchemaActualizarUsuario.validate(validar, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }; 
    await VL.actualizarUser(value);
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error: // Actualizar un usuario, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error actualizando usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID requerido" });
    }
    const id = req.params.id;
    const Super = req.session.user; // Nickname del Super Administrador para las sucursales del ing.Responsable eliminado
    const { error, value } = SC.SchemaEliminarUsuario.validate({ id }, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    await VL.eliminarUser(value, Super);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error: // Eliminar un usuario, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error eliminando usuario' });
  }
};

// Cerrar la sesión de todos los usuarios
const logoutaAllUsers = async (req, res) => {
  try {
    await VL.sacarAllUsers();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error: // Cerrar la sesión de todos los usuarios, ', error);
    res.sendStatus(500);
  }
};

// Desactivar el acceso de todos los usuarios
const deactivateAllUsers = async (req, res) => {
  try {
    await VL.desactivarAllUsers();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error: // Desactivar el acceso de todos los usuarios, ', error);
    res.sendStatus(500);
  }
};

// Activar el acceso de todos los usuarios
const activateAllUsers = async (req, res) => {
  try {
    await VL.activarAllUsers();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error: // Activar el acceso de todos los usuarios, ', error);
    res.sendStatus(500);
  }
};

export const controllers = {
  postUser,
  getUsers,
  updateUser,
  deleteUser,
  logoutaAllUsers,
  deactivateAllUsers,
  activateAllUsers
};