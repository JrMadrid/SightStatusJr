/* VALIDACIONES DE PANEL DE INFORMES */
import Joi from 'joi';

// RegEx
const IDRegex = /^\d{1,5}$/
const ecoRegex = /^\d{6}$/

const nombre = Joi.string()
  .max(100)
  .allow('')
  .messages({
    'string.max': 'El nombre no debe superar los 100 caracteres.',
  });

// Agregar informe
const SchemaAgregarInforme = Joi.object({
  economico: Joi.string()
    .pattern(ecoRegex)
    .required()
    .messages({
      'string.empty': 'El número económico es obligatorio.',
      'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.'
    }),
  frealizada: Joi.date()
    .required()
    .messages({
      'any.required': 'La fecha de realización es obligatoria.',
      'date.base': 'La fecha debe tener un formato válido.'
    }),
  nombre: nombre,
  documento: nombre,
  descripcion: Joi.string()
    .max(100)
    .allow('')
    .messages({
      'string.max': 'La descripción no puede tener más de 100 caracteres.'
    })
});

// Eliminar informe
const SchemaEliminarInforme = Joi.object({
  id: Joi.string()
    .pattern(IDRegex)
    .max(5)
    .required()
    .messages({
      'string.empty': 'El ID es obligatorio.',
      'string.pattern.base': 'El ID debe contener solo números.',
      'string.max': 'El ID debe tener como máximo 5 caracteres.',
    })
});

export const schemas = {
  SchemaAgregarInforme, 
  SchemaEliminarInforme
};