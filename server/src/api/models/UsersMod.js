/* MODEL PARA TABLA DE USUARIOS */
export default class Users {
  constructor({
    id,
    nickname,
    password,
    isAdmin = false,
    tipo,
    activo = true
  }) {
    this.id = id;
    this.nickname = nickname;
    this.password = password;
    this.isAdmin = isAdmin;
    this.tipo = tipo;
    this.activo = activo;
  }
};