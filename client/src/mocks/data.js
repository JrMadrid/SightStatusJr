/* DATOS MOCKS */

// Dato de prueba para el Lider del personal
export const mockUser = {
  username: 'Lider',
  isAdmin: true,
  tipo: 'Super Administrador',
  id: 1,
};

// Datos de prueba para los usuarios
export const mockUsers = [
  { id: 1, nickname: 'Lider', psw: '********', tipo: 'Super Administrador', activo: true },
  { id: 2, nickname: 'AnaSoporte', psw: '********', tipo: 'Administrador', activo: true },
  { id: 3, nickname: 'CarlosGeo', psw: '********', tipo: 'Geografia', activo: true },
  { id: 4, nickname: 'MesaApp', psw: '********', tipo: 'Aplicativo', activo: false },
];

// Datos de prueba para las sucursales
export const mockBranches = [
  { id: 1, economico: '000000', canal: 'Especial', nombre: 'Sin establecer', ingresponsable: 'Lider' },
  { id: 2, economico: '102345', canal: 'Centro', nombre: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte' },
  { id: 3, economico: '204118', canal: 'Norte', nombre: 'San Pedro Sula Plaza', ingresponsable: 'AnaSoporte' },
  { id: 4, economico: '305771', canal: 'Occidente', nombre: 'Santa Rosa de Copan', ingresponsable: 'CarlosGeo' },
  { id: 5, economico: '408220', canal: 'Sur', nombre: 'Choluteca Centro', ingresponsable: 'CarlosGeo' },
];

// Datos de prueba para los dispositivos
export const mockDevices = [
  { id: 1, dispositivo: 'UPS', nombre: 'UPS', ip: '10.10.12.20', economico: '102345', canal: 'Centro', sucursal: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte', descripcion: 'UPS principal de comunicaciones.', general: 'Modelo: Smart UPS\nFirmware: Mock 1.0\nSin alarmas criticas.' },
  { id: 2, dispositivo: 'Biometrico', nombre: 'Biometrico', ip: '10.10.12.33', economico: '102345', canal: 'Centro', sucursal: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte', descripcion: 'Control biometrico de entrada.', general: 'Firmware: MockBio 2.1\nUsuarios registrados: 42.' },
  { id: 3, dispositivo: 'Router', nombre: 'Router', ip: '10.20.30.1', economico: '204118', canal: 'Norte', sucursal: 'San Pedro Sula Plaza', ingresponsable: 'AnaSoporte', descripcion: 'Router de comunicaciones.', general: 'Estado: En linea.' },
  { id: 4, dispositivo: 'Camara', nombre: 'Camara', ip: '000.12.88.45', economico: '305771', canal: 'Occidente', sucursal: 'Santa Rosa de Copan', ingresponsable: 'CarlosGeo', descripcion: 'Equipo de prueba sin inventario.', general: '' },
  { id: 5, dispositivo: 'Impresora Laser', nombre: 'Impresora Laser', ip: '001.44.10.19', economico: '408220', canal: 'Sur', sucursal: 'Choluteca Centro', ingresponsable: 'CarlosGeo', descripcion: 'Equipo no aplicable para monitoreo IP.', general: '' },
];

// Datos de prueba para los mantenimientos
export const mockMaintenances = [
  { id: 1, economico: '102345', canal: 'Centro', nombre: 'Tegucigalpa Principal', sucursal: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte', festimada: '2026-08-20', frealizada: '2026-08-05', realizado: '2026-08-05', descripcion: 'Revision general del UPS y limpieza del gabinete.' },
  { id: 2, economico: '204118', canal: 'Norte', nombre: 'San Pedro Sula Plaza', sucursal: 'San Pedro Sula Plaza', ingresponsable: 'AnaSoporte', festimada: '2026-09-12', frealizada: null, realizado: null, descripcion: 'Mantenimiento pendiente.' },
  { id: 3, economico: '305771', canal: 'Occidente', nombre: 'Santa Rosa de Copan', sucursal: 'Santa Rosa de Copan', ingresponsable: 'CarlosGeo', festimada: '2026-10-01', frealizada: '2026-07-22', realizado: '2026-07-22', descripcion: 'Cambio de bateria y revision de autonomia.' },
];

// Datos de prueba para los manuales
export const mockManuals = [
  { id: 1, nombre: 'Manual UPS', descripcion: 'Procedimiento para revisar el estado de una UPS.' },
  { id: 2, nombre: 'Manual Biometrico', descripcion: 'Guia de revision y administracion del equipo biometrico.' },
];

// Datos de prueba para los reportes
export const mockReports = [
  { id: 1, economico: '102345', canal: 'Centro', sucursal: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte', fecharealizada: '2026-08-05', nombre: 'Revision de energia', descripcion: 'Informe de mantenimiento preventivo.' },
  { id: 2, economico: '204118', canal: 'Norte', sucursal: 'San Pedro Sula Plaza', ingresponsable: 'AnaSoporte', fecharealizada: '2026-07-18', nombre: 'Cambio de equipo de red', descripcion: 'Validacion posterior al reemplazo del router.' },
];

// Datos de prueba para el personal
export const mockPeople = [
  { id: 1, nickname: 'Lider', cedula: '0801-1999-00001', localidad: 'Tegucigalpa', fecha_nacimiento: '1999-01-15', sexo: 'M', fecha_contratacion: '2024-01-01', descripcion: 'Perfil de ejemplo para revisar la ficha personal.', grado_academico: 'Ingenieria en Sistemas', puesto: 'Administrador del sistema', nombre: 'Juan Madrid', telefono: '504 9999-0001' },
  { id: 2, nickname: 'AnaSoporte', cedula: '0801-1998-00002', localidad: 'Tegucigalpa', fecha_nacimiento: '1998-05-20', sexo: 'F', fecha_contratacion: '2025-03-10', descripcion: 'Responsable de soporte para la zona Centro y Norte.', grado_academico: 'Ingenieria', puesto: 'Soporte tecnico', nombre: 'Ana Rivera', telefono: '504 9999-0002' },
  { id: 3, nickname: 'CarlosGeo', cedula: '0401-1997-00003', localidad: 'Santa Rosa de Copan', fecha_nacimiento: '1997-11-03', sexo: 'M', fecha_contratacion: '2025-06-17', descripcion: 'Usuario de geografia para seguimiento en campo.', grado_academico: 'Tecnico', puesto: 'Geografia', nombre: 'Carlos Mejia', telefono: '504 9999-0003' },
];

// Datos de prueba para las ubicaciones de las sucursales
export const mockLocations = [
  { id: 1, economico: '102345', latitud: 14.0723, longitud: -87.1921, direccion: 'Boulevard Morazan, Tegucigalpa', actualizado: '2026-08-05T10:30:00.000Z', descripcion: 'Sucursal ubicada en una zona de alto trafico.', sucursal: 'Tegucigalpa Principal', ingresponsable: 'AnaSoporte' },
  { id: 2, economico: '204118', latitud: 15.5042, longitud: -88.025, direccion: 'San Pedro Sula, Plaza Norte', actualizado: '2026-07-12T09:00:00.000Z', descripcion: 'Acceso por el estacionamiento principal.', sucursal: 'San Pedro Sula Plaza', ingresponsable: 'AnaSoporte' },
];

// Datos de prueba para el estado de los dispositivos
export const mockDeviceStatus = (device) => ({
  ...device,
  informacionimportante: device.nombre === 'UPS' ? 'Carga: 68%\nBateria: Normal' : 'Estado: En linea',
  informacionimportante2: device.nombre === 'UPS' ? 'Autonomia estimada: 28 minutos' : '',
  informacionrelevante: 'Informacion simulada para probar la pantalla.',
  informaciontecnica: device.nombre === 'UPS' ? 'Modelo: Smart UPS\nEntrada: 120V' : 'Puerto: 4370',
});