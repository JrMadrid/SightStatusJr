/* VALIDACIONES DE PANEL DE MANTENIMIENTOS y CONSTANCIAS*/
import Joi from 'joi';

// Esquema de validación para agregar una fecha estimada
const SchemaAgregarMantenimiento = Joi.object({
  // La fecha estimada es obligatoria y debe ser una fecha válida
  festimada: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha estimada debe ser una fecha válida.',
      'any.required': 'La fecha estimada es obligatoria.',
    }),

  // El número económico es obligatorio, debe ser una cadena de 6 caracteres numéricos exactos
  economico: Joi.string()
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.empty': 'El número económico es obligatorio.',
      'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.',
      'any.required': 'El número económico es obligatorio.',
    })
});

// Esquema de validación para agregar una constancia de mantenimiento
const SchemaAgregarConstanciaMantenimiento = Joi.object({
  // Fecha en la que se realizó el mantenimiento, obligatoria y debe ser válida
  frealizada: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha realizada debe ser una fecha válida.',
      'any.required': 'La fecha realizada es obligatoria.',
    }),

  // ID del dispositivo al que se le realizó mantenimiento, entre 1 y 5 dígitos
  id: Joi.string()
    .pattern(/^\d{1,5}$/)
    .required()
    .messages({
      'string.empty': 'El ID es obligatorio.',
      'string.pattern.base': 'El ID debe contener entre 1 y 5 dígitos numéricos.',
      'any.required': 'El ID es obligatorio.',
    }),

  // Descripción opcional del mantenimiento, hasta 8000 caracteres
  descripcion: Joi.string()
    .max(8000)
    .allow('')
    .messages({
      'string.max': 'La descripción no debe exceder los 8000 caracteres.',
    })
});

// Esquema de validación para actualizar una fecha estimada
const SchemaActualizarMantenimiento = Joi.object({
  // Campo obligatorio 'id'
  id: Joi.number() // Debe ser un número
    .integer() // Solo enteros
    .min(1) // Mínimo: 1
    .required() // No puede faltar
    .messages({
      'any.required': 'El ID es obligatorio.',
      'number.base': 'El ID debe ser un número.',
      'number.min': 'El ID debe ser mayor a cero.',
      'number.integer': 'El ID debe ser un número entero.'
    }),

  // La fecha estimada debe ser una fecha válida
  festimada: Joi.date()
    .allow('')
    .messages({
      'date.base': 'La fecha estimada debe ser una fecha válida.',
    }),

  // El número económico debe ser una cadena de 6 caracteres numéricos exactos
  economico: Joi.string()
    .pattern(/^\d{6}$/)
    .allow('')
    .messages({
      'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.',
    })
});

// Esquema de validación para eliminar un mantenimiento 
const SchemaEliminarMantenimiento = Joi.object({
  // Campo obligatorio 'id'
  id: Joi.number() // Debe ser un número
    .integer() // Solo enteros
    .min(1) // Mínimo: 1
    .required() // No puede faltar
    .messages({
      'any.required': 'El ID es obligatorio.',
      'number.base': 'El ID debe ser un número.',
      'number.min': 'El ID debe ser mayor a cero.',
      'number.integer': 'El ID debe ser un número entero.'
    })
});

export { SchemaAgregarMantenimiento, SchemaAgregarConstanciaMantenimiento, SchemaActualizarMantenimiento, SchemaEliminarMantenimiento };