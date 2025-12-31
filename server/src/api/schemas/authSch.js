/* SCHEMAS DE VALIDACIONES DE AUTENTICACIÓN DE USUARIOS*/
import Joi from 'joi';

// Verificar Usuario
const SchemaComprobarUsuario = Joi.object({
  nickname: Joi.string()
    .required()
    .max(50)
    .messages({
      'string.empty': 'El nombre del usuario es obligatorio.',
      'string.max': 'El nombre no debe tener más de 50 caracteres.'
    }),

  psw: Joi.string()
    .required()
    .max(50)
    .messages({
      'string.empty': 'La contraseña es obligatoria.',
      'string.max': 'La contraseña no debe tener más de 50 caracteres.'
    })
});

export const schemas = {
  SchemaComprobarUsuario
};