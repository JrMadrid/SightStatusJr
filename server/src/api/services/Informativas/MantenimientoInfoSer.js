/* SERVICIOS DE INFORMATIVA -- MANTENIMIENTO */
import { verificaciones as VR } from "../../rules/Informativas/MantenimientoInfoVer.js";
import { operaciones as OP } from "../../repositories/Informativas/MantenimientoInfoOpe.js";

// Mandar las fechas vinculadas al economico
const PedirFechasRealizadas = async (economico, responsable, tipo) => {
  if (!(await VR.SucursalExiste(economico))) { throw { code: 404, message: 'No se encontró la sucursal (economico no válido)' }; };
  if (tipo === 'Geografia') {
    if (!(await VR.SucursalPerteneciente(economico, responsable))) { throw { code: 404, message: 'No es su sucursal (economico no válido)' }; }
  };
  return await OP.getFechasRealizadas(economico, responsable, tipo);
};

// Mandar el documento del mantemiento seleccionado
const PedirFechaSeleccionada = async (id) => {
  return await OP.getFechaSeleccionada(id);
};

// Mandar el archivo de la constancia de la fecha seleccionada
const obtenerArchivoMantenimiento = async (fechasr) => {
  return await OP.getMantenimientoArchivo(fechasr);
};

// Mandar todas las constancias
const obtenerArchivosMantenimientos = async (economico) => {
  const constanciasArchivos = await OP.getMantenimientosArchivos(economico);
  if (constanciasArchivos.length > 0) {
    const archivos = constanciasArchivos.map(item => {
      return item.constancia;
    });
    return archivos;
  } else {
    throw { code: 404, message: 'Mantenimientos no encontrados' };
  }
};

export const services = {
  PedirFechasRealizadas,
  PedirFechaSeleccionada,
  obtenerArchivoMantenimiento,
  obtenerArchivosMantenimientos
};