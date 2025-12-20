/* MODEL PARA TABLA DE MANUALES */
export default class Manuales {
  constructor({
    id,
    nombre = null,
    manual,
    descripcion = null
  }) {
    this.id = id;
    this.nombre = nombre;
    this.manual = manual;
    this.descripcion = descripcion;
  }
};