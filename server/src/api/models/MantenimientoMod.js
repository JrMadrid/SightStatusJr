/* MODEL PARA TABLA DE MANTENIMIENTOS */
export default class Mantenimientos {
  constructor({
    id,
    fechaEstimada,
    fechaRealizada = null,
    economico,
    constancia = null,
    descripcion = null
  }) {
    this.id = id;
    this.fechaEstimada = fechaEstimada;
    this.fechaRealizada = fechaRealizada;
    this.economico = economico;
    this.constancia = constancia;
    this.descripcion = descripcion;
  }
};