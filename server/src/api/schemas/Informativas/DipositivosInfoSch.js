/* SCHEMAS DE VALIDACIONES DE INFORMATIVA -- DISPOSITIVOS */
import Joi from "joi";

const nombre = Joi.string()
  .max(75)
  .messages({
    'string.max': 'El nombre del dispositivo no puede superar los 75 caracteres.'
  });

// Pedir dispositivos
const SchemaPedirDispositivos = Joi.object({
  nombre
});

export const schemas = {
  SchemaPedirDispositivos
};