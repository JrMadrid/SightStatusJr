/* MODEL PARA TABLA DE DISPOSITIVOS */
export default class Dispositivos {
  constructor({
    id,
    ip,
    economico,
    nombre = null,
    descripcion = null,
    general = null
  }) {
    this.id = id;
    this.ip = ip;
    this.economico = economico;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.general = general;
  }
};