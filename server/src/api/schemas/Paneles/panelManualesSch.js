// SCHEMAS DE VALIDACIONES DE PANEL DE MANUALES
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
    'string.max': 'El ID debe tener como máximo 5 caracteres.',
  });

const nombre = Joi.string()
  .max(100)
  .allow('')
  .messages({
    'string.max': 'El nombre no debe superar los 100 caracteres.',
  });

const descripcion = Joi.string()
  .max(100)
  .allow('')
  .messages({
    'string.max': 'La descripción no debe superar los 100 caracteres.',
  });

// Agregar manual
const SchemaAgregarManual = Joi.object({
  nombre,
  documento: nombre,
  descripcion,
  manual: Joi.any() // Solo para referencia
});

// Actualizar un manual
const schemaActualizarManual = Joi.object({
  id,
  nombre,
  descripcion,
});
// }).unknown(false); // Prohíbe campos no definidos en el esquema

// Eliminar manual
const SchemaEliminarManual = Joi.object({
  id
});


export const schemas = {
  SchemaAgregarManual,
  schemaActualizarManual,
  SchemaEliminarManual
};