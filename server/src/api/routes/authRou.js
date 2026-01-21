/* RUTAS DE AUTENTICACIÓN DE USUARIOS */
import express from 'express';
import { controllers as CN } from '../controllers/authCon.js';
const authRou = express.Router();  

authRou.get('/check', CN.check);// Verificar si ya tiene sesión activa -- /api/auth/check
authRou.post('/login/user', CN.login); // Leer y comprobar el usuario -- /api/auth/login/user
authRou.get('/api/user', CN.user); // Definir el tipo de usuario -- /api/auth/api/user
authRou.get('/out', CN.logout); // Cerrar sesión -- /api/auth/out

export default authRou;