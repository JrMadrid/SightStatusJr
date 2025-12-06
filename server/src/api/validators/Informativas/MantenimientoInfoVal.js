/* VALIDACIONES DE INFORMATIVA -- MANTENIMIENTO */
import Joi from "joi";

// RegEx
const ecoRegex = /^\d{6}$/

const economico = Joi.string()
  .pattern(ecoRegex)
  .messages({
    'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.'
  });

// Pedir mantenimiento
const SchemaPedirMantenimiento = Joi.object({
  economico
});

export const schemas = {
  SchemaPedirMantenimiento
};