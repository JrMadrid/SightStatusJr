/* SCHEMAS DE VALIDACIONES DE INFORMATIVA -- SUCURSAL */
import Joi from "joi";

// RegEx
const ecoRegex = /^\d{6}$/

const economico = Joi.string()
  .pattern(ecoRegex)
  .messages({
    'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.'
  });

// Pedir sucursal
const SchemaPedirSucursal = Joi.object({
  economico
});

export const schemas = {
  SchemaPedirSucursal
};