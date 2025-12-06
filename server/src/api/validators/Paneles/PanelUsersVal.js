/* VALIDACIONES DE PANEL DE USUARIOS */
import Joi from 'joi';

// RegEx
const IDRegex = /^\d{1,5}$/

const id = Joi.string()
  .pattern(IDRegex)
  .max(5)
  .required()
  .messages({
    'string.empty': 'El ID es obligatorio.',
    'string.pattern.base': 'El ID debe contener solo números.',
    'string.max': 'El ID debe tener como máximo 5 caracteres.'
  });

const nickname = Joi.string()
  .max(50)
  .messages({
    'string.max': 'El nombre no debe tener más de 50 caracteres.'
  });

const psw = Joi.string()
  .max(50)
  .messages({
    'string.max': 'La contraseña no debe tener más de 50 caracteres.'
  });

const tipo = Joi.string()
  .valid('Geografia', 'Aplicativo', 'Administrador')
  .messages({
    'any.only': 'El tipo de usuario debe ser Geografia, Aplicativo o Administrador.'
  });

const activo = Joi.string()
  .valid('si', 'no')
  .messages({
    'any.only': 'El campo activo debe ser Sí o No.'
  });

// Crear Usuario
const SchemaCrearUsuario = Joi.object({
  nickname: nickname.required()
    .messages({ 'string.empty': 'El nombre del usuario es obligatorio.' }),
  psw: psw.required()
    .messages({ 'string.empty': 'La contraseña es obligatoria.' }),
  tipo: tipo.required()
    .messages({ 'string.empty': 'El tipo de usuario es obligatorio.' }),
  activo: activo.required()
    .messages({ 'any.required': '"El campo activo es obligatorio.' })
});

// Actualizar Usuario
const SchemaActualizarUsuario = Joi.object({
  id,
  nickname: Joi.string().allow(''),
  psw: psw.allow(''),
  tipo: tipo.valid('Geografia', 'Aplicativo', 'Administrador', '')
    .messages({ 'any.only': 'El tipo de usuario debe ser Geografia, Aplicativo, Administrador o estar vacío.' }),
  activo: activo.allow('')
});

// Eliminar Usuario
const SchemaEliminarUsuario = Joi.object({
  id
});

export const schemas = {
  SchemaCrearUsuario,
  SchemaActualizarUsuario,
  SchemaEliminarUsuario
};