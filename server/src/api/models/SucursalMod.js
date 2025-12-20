/* MODEL PARA TABLA DE SUCURSALES */
export default class Sucursales {
  constructor({
    id,
    canal = null,
    nombre = null,
    economico,
    ingResponsable
  }) {
    this.id = id;
    this.canal = canal;
    this.nombre = nombre;
    this.economico = economico;
    this.ingResponsable = ingResponsable;
  }
};