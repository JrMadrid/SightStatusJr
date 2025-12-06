/* VALIDACIONES DE PANEL DE DISPOSITIVOS */
import Joi from 'joi';

// RegEx
const IDRegex = /^\d{1,5}$/
const ipRegex = /^(000|001|((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)))\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;
const ecoRegex = /^\d{6}$/

const id = Joi.string()
  .pattern(IDRegex)
  .max(5) // Longitud máxima: 5 caracteres
  .required() // Campo obligatorio
  .messages({
    'string.empty': 'El ID es obligatorio.',
    'string.pattern.base': 'El ID debe contener solo números.',
    'string.max': 'El ID debe tener como máximo 5 caracteres.',
  });

const economico = Joi.string()
  .pattern(ecoRegex)
  .max(6)
  .messages({
    'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.',
    'string.max': 'El número económico debe tener como máximo 6 caracteres.',
  });

const nombre = Joi.string()
  .max(75)
  .messages({
    'string.max': 'El nombre del dispositivo no puede superar los 75 caracteres.'
  });

const ip = Joi.string()
  .pattern(ipRegex)
  .messages({
    'string.pattern.base': 'La IP debe ser válida o una IP especial que empiece con 000. o 001.',
  });

const descripcion = Joi.string()
  .max(100)
  .allow('')
  .messages({
    'string.max': 'La descripción no puede tener más de 100 caracteres.'
  });

const general = Joi.string()
  .max(8000)
  .allow('')
  .messages({
    'string.max': 'El campo general no puede tener más de 8000 caracteres.'
  });

// Crear dispositvo
const SchemaCrearDispositivo = Joi.object({
  nombre: nombre.required()
    .messages({ 'string.empty': 'El nombre del dispositivo es obligatorio.' }),
  ip: ip.required()
    .messages({ 'string.empty': 'La IP es obligatoria.' }),
  economico: economico.required()
    .messages({ 'string.empty': 'El número económico no puede estar vacío.' }),
  descripcion,
  general
});

// Actualizar dispositivo
const SchemaActualizarDispositivo = Joi.object({
  id,
  nombre: nombre.allow(''),
  ip: ip.allow(''),
  economico: economico.allow(''),
  descripcion,
  general,
  reiniciar: Joi.string()
    .valid('', 'yes', 'no')
    .messages({ 'any.only': 'El campo reiniciar debe ser "yes", "no" o vacío.' })
});

// Eliminar dispositivo
const SchemaEliminarDispositivo = Joi.object({
  id
});

export const schemas = {
  SchemaCrearDispositivo,
  SchemaActualizarDispositivo,
  SchemaEliminarDispositivo
}; 