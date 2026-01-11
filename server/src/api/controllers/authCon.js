/* CONTROLADORES DE AUTENTICACIÓN DE USUARIOS */
import { validators as VL } from '../validators/authVal.js';
import { schemas as SC } from '../schemas/authSch.js';

// Verificar si ya tiene sesión activa
const check = async (req, res) => {
  try {
    if (req.session?.user) {
      return res.status(200).json({ iniciado: req.session.user });
    }
    return res.sendStatus(401);
  } catch (error) {
    console.error('Error: // Verificar si ya tiene sesión activa, ', error);
    return res.sendStatus(500);
  }
};

// Leer y comprobar el usuario
const login = async (req, res) => {
  try {
    if (!req.body.psw) {
      return res.status(400).json({ message: 'Contraseña requerida' });
    }
    const { error, value } = SC.SchemaComprobarUsuario.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      const mensajes = error.details.map(e => e.message).join('\n');
      return res.status(400).json({ message: mensajes });
    }
    const { usuario, admon, tipo } = await VL.loginService(value);
    req.session.user = usuario;
    req.session.admin = admon;
    req.session.login = true;
    req.session.tipo = tipo.trim();
    if (tipo !== 'Super Administrador') {
      req.session.perfil = usuario;
    }
    req.session.save(err => {
      if (err) {
        console.error('Error al guardar sesión:', err);
        return res.status(500).json({ message: 'Error al guardar sesión' });
      }
      res.status(200).json({ iniciado: req.session.user });
    });
  } catch (error) {
    console.error('Error: // Leer y comprobar el usuario, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error al iniciar sesión' });
  }
};

// Definir el tipo de usuario
const user = async (req, res) => {
  try {
    const userInfo = await VL.definirTipoUsuario(req.session);
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error: // Definir el tipo de usuario, ', error);
    res.status(500).json({ message: 'Error al obtener información de usuario' });
  }
};

// Cerrar sesión
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.status(200).json({ success: true });
  });
};

export const controllers = {
  check,
  login,
  logout,
  user
};