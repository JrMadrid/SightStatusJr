/* SCHEMAS DE VALIDACIONES DE PANEL DE SUCURSALES */
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
    'string.max': 'El ID debe tener como máximo 5 caracteres.'
  });

const economico = Joi.string()
  .pattern(ecoRegex)
  .max(6)
  .messages({
    'string.pattern.base': 'El número económico debe tener exactamente 6 dígitos.',
    'string.max': 'El número económico debe tener como máximo 6 caracteres.'
  });

const canal = Joi.string()
  .max(30)
  .messages({
    'string.max': 'El canal no debe tener más de 30 caracteres.'
  });

const nombre = Joi.string()
  .max(50)
  .messages({
    'string.max': 'El nombre no debe tener más de 50 caracteres.'
  });

const ingresponsable = Joi.string()
  .max(50)
  .messages({
    'string.max': 'Máximo 50 caracteres para el ingeniero responsable.',
  });

const rellenar = Joi.string()
  .valid('yes', 'no', '')
  .messages({
    'any.only': 'El valor de "rellenar" debe ser yes, no o vacío.',
  });

// Crear sucursal
const SchemaCrearSucursal = Joi.object({
  economico: economico.required()
    .messages({ 'string.empty': 'El número económico es obligatorio.' }),
  canal: canal.required()
    .messages({ 'string.empty': 'El canal es obligatorio.' }),
  nombre: nombre.required()
    .messages({ 'string.empty': 'El nombre es obligatorio.' }),
  ingresponsable: ingresponsable.required()
    .messages({ 'string.empty': 'El nombre del ingeniero responsable es obligatorio.', }),
  rellenar
});

// Actualizar sucursal
const SchemaActualizarSucursal = Joi.object({
  id,
  economico: economico.allow(''),
  canal: canal.allow(''),
  nombre: nombre.allow(''),
  ingresponsable: ingresponsable.allow(''),
  rellenar: rellenar
});

// Eliminar sucursal
const SchemaEliminarSucursal = Joi.object({
  id
});

export const schemas = {
  SchemaCrearSucursal,
  SchemaActualizarSucursal,
  SchemaEliminarSucursal
};