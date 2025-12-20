/* MODEL PARA TABLA DE UBICACIÓN DE SUCURSALES */
export default class Ubicacion {
  constructor({
    id,
    economico,
    latitud = null,
    longitud = null,
    direccion = null,
    actualizado = null,
    imagen = null,
    descripcion = null
  }) {
    this.id = id;
    this.economico = economico;
    this.latitud = latitud;
    this.longitud = longitud;
    this.direccion = direccion;
    this.actualizado = actualizado;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
};