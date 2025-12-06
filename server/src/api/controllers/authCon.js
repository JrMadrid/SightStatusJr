/* CONTROLADORES DE AUTENTICACIÓN DE USUARIOS */
import { services as SR } from '../services/authSer.js';
import { schemas as SC } from '../validators/authVal.js';

// Verificar si ya tiene sesión activa
const check = async (req, res) => {
  try {
    // req.session.user debería haberse creado al hacer login
    if (req.session?.user) {
      return res.status(200).json({ iniciado: req.session?.user });
    } else {
      // No hay sesión activa
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error: // Verificar si ya tiene sesión activa, ", error);
    return res.sendStatus(500);
  }
};

// Leer y comprobar el usuario
const login = async (req, res) => {
  try {
    if (!req.body.psw) {
      return res.status(400).json({ message: "Contraseña requerida" });
    }
    const { error, value } = SC.SchemaComprobarUsuario.validate(req.body, { abortEarly: false });
    if (error) {
      const mensajes = error.details.map(err => err.message).join('\n');
      return res.status(400).json({ message: mensajes || 'hola' });
    };
    const { usuario, admon, tipo } = await SR.loginService(value);
    req.session.user = usuario;
    req.session.admin = admon;
    req.session.login = req.session.user ? true : false; // Se ha iniciado sesión correctamente		
    req.session.tipo = tipo.trim();
    if (tipo !== "Super Administrador") {
      req.session.perfil = usuario;
    }
    req.session.save(err => {
      if (err) {
        console.error('Error al guardar la sesión:', err);
        return res.status(500).json({ message: 'Error al guardar sesión' });
      }
      res.status(200).json({ iniciado: req.session?.user });
    });
  } catch (error) {
    console.error('Error: // Leer y comprobar el usuario, ', error);
    res.status(error?.code || 500).json({ message: error?.message || 'Error en login' });
  }
};

// Definir el tipo de usuario
const user = async (req, res) => {
  const userInfo = await SR.definirTipoUsuario(req.session);
  res.status(200).json(userInfo);
};

// Cerrar sesión
const logout = async (req, res) => {
  let cierre = false;
  while (!cierre) {
    await req.session.destroy();
    cierre = !req.session ? true : false;
    res.status(200).json(cierre);
  }
  console.log('Sesión destruida');
};

export const controllers = {
  check,
  login,
  logout,
  user
};