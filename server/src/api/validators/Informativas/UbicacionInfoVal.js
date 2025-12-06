/* VALIDACIONES DE INFORMATIVA -- UBICACIÓN */
import Joi from "joi";

// RegEx
const ecoRegex = /^\d{6}$/

const economico = Joi.string()
  .pattern(ecoRegex)
  .messages({
    'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.'
  });

// Pedir ubicación
const SchemaPedirUbicacion = Joi.object({
  economico
});

// Actualizar ubicación
const SchemaActualizarUbicacion = Joi.object({
  economico,

  latitud: Joi.number()
    .precision(8)
    .min(-90)
    .max(90)
    .messages({
      "number.base": "La latitud debe ser un número decimal.",
      "number.min": "La latitud no puede ser menor que -90.",
      "number.max": "La latitud no puede ser mayor que 90."
    }),

  longitud: Joi.number()
    .precision(8)
    .min(-180)
    .max(180)
    .messages({
      "number.base": "La longitud debe ser un número decimal.",
      "number.min": "La longitud no puede ser menor que -180.",
      "number.max": "La longitud no puede ser mayor que 180."
    }),

  direccion: Joi.string()
    .max(255)
    .allow(null, '')
    .messages({
      "string.base": "La dirección debe ser un texto.",
      "string.max": "La dirección no puede exceder los 255 caracteres."
    }),

  actualizado: Joi.date()
    .iso()
    .less("now")
    .allow(null)
    .messages({
      "date.base": "La fecha de actualización debe ser válida.",
      "date.format": "La fecha debe estar en formato ISO (YYYY-MM-DD).",
      "date.less": "La fecha de actualización no puede ser futura."
    }),

  descripcion: Joi.string()
    .max(3000)
    .allow(null, '')
    .messages({
      "string.base": "La descripción debe ser un texto.",
      "string.max": "La descripción no puede exceder los 3,000 caracteres."
    }),

  BorrarImagen: Joi.boolean().optional()

}).min(1) // Asegura que al menos un campo se envíe
  .messages({
    "object.min": "Debes enviar al menos un campo para actualizar."
  });

export const schemas = {
  SchemaPedirUbicacion,
  SchemaActualizarUbicacion
};