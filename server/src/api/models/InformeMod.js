/* MODEL PARA TABLA DE INFORMES */
export default class Informes {
  constructor({
    id,
    economico,
    fechaRealizada,
    nombre = null,
    descripcion = null,
    informe
  }) {
    this.id = id;
    this.economico = economico;
    this.fechaRealizada = fechaRealizada;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.informe = informe;
  }
};