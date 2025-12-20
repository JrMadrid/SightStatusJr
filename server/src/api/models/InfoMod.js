/* MODEL PARA TABLA DE INFORME DISPOSITIVOS */
export default class Info {
  constructor({
    ip,
    informacion,
    eventosAltos = null,
    eventosMedios = null,
    eventosBajos = null
  }) {
    this.ip = ip;
    this.informacion = informacion;
    this.eventosAltos = eventosAltos;
    this.eventosMedios = eventosMedios;
    this.eventosBajos = eventosBajos;
  }
};