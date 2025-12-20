/* MODEL PARA TABLA DE PERSONAL */
export default class Personal {
  constructor({
    id,
    nickname,
    cedula,
    localidad = null,
    foto = null,
    fechaNacimiento = null,
    sexo = null,
    fechaContratacion,
    descripcion = null,
    gradoAcademico = null,
    puesto,
    nombre = null,
    telefono = null
  }) {
    this.id = id;
    this.nickname = nickname;
    this.cedula = cedula;
    this.localidad = localidad;
    this.foto = foto;
    this.fechaNacimiento = fechaNacimiento;
    this.sexo = sexo;
    this.fechaContratacion = fechaContratacion;
    this.descripcion = descripcion;
    this.gradoAcademico = gradoAcademico;
    this.puesto = puesto;
    this.nombre = nombre;
    this.telefono = telefono;
  }
};