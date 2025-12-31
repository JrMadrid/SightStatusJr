/* SCHEMAS DE VALIDACIONES DE PANEL DE MANTENIMIENTOS y CONSTANCIAS*/
import Joi from 'joi';

// RegEx
const IDRegex = /^\d{1,5}$/
const ecoRegex = /^\d{6}$/

const id = Joi.string()
  .pattern(IDRegex)
  .max(5)
  .required()
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
    'string.max': 'El número económico debe tener como máximo 6 caracteres.'
  });

const festimada = Joi.date()
  .messages({
    'date.base': 'La fecha estimada debe ser una fecha válida.',
  });

// Agregar mantenimiento
const SchemaAgregarMantenimiento = Joi.object({
  festimada: festimada.required()
    .messages({ 'any.required': 'La fecha estimada es obligatoria.' }),
  economico: economico.required()
    .messages({ 'string.empty': 'El número económico no puede estar vacío.' })
});

// Actualizar mantenimiento
const SchemaActualizarMantenimiento = Joi.object({
  id,
  festimada: festimada.allow(''),
  economico: economico.allow('')
});

// Eliminar mantenimiento
const SchemaEliminarMantenimiento = Joi.object({
  id
});

// Agregar constancia de mantenimiento
const SchemaAgregarConstanciaMantenimiento = Joi.object({
  id,

  frealizada: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha realizada debe ser una fecha válida.',
      'any.required': 'La fecha realizada es obligatoria.',
    }),

  descripcion: Joi.string()
    .max(8000)
    .allow('')
    .messages({
      'string.max': 'La descripción no debe exceder los 8000 caracteres.',
    })
});

export const schemas = {
  SchemaAgregarMantenimiento,
  SchemaAgregarConstanciaMantenimiento,
  SchemaActualizarMantenimiento,
  SchemaEliminarMantenimiento
};