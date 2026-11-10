/* USO DE LOS DATOS DE PRUEBA */
import { mockUser, mockUsers, mockBranches, mockDevices, mockMaintenances, mockManuals, mockReports, mockPeople, mockLocations, mockDeviceStatus } from './data';

export const mocksEnabled = import.meta.env.VITE_USE_MOCKS === 'true';

const pause = (value) => new Promise(resolve => setTimeout(() => resolve(copy(value)), 120));
const copy = value => value == null ? value : JSON.parse(JSON.stringify(value));
const success = message => ({ message: `Modo mock: ${message}` });

const routeData = (url) => {
  const path = new URL(url, window.location.origin).pathname;
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const tail = parts.at(-1);

  if (path === '/api/auth/api/user' || path === '/api/auth/check') return { iniciado: mockUser.username, ...mockUser };
  if (path === '/api/panel/users') return mockUsers;
  if (path === '/api/panel/sucursales') return mockBranches;
  if (path === '/api/panel/dispositivos') return mockDevices.map(device => ({ ...device, ip: device.ip.startsWith('000.') ? 'Sin inventario' : device.ip.startsWith('001.') ? 'No aplica' : device.ip }));
  if (path === '/api/panel/dispositivos/lista') return [...new Set(mockDevices.map(device => device.nombre))].map(nombre => ({ nombre }));
  if (path === '/api/panel/mantenimientos') return mockMaintenances;
  if (path === '/api/panel/manuales') return mockManuals;
  if (path === '/api/panel/informes') return mockReports;

  if (path.startsWith('/api/panel/manual/')) return mockManuals.find(item => item.id === Number(tail)) || mockManuals[0];
  if (path.startsWith('/api/panel/informe/')) return mockReports.find(item => item.id === Number(tail)) || mockReports[0];
  if (path.startsWith('/api/panel/dispositivos/ping/')) return { alive: true, output: 'Mock ping: dispositivo disponible' };

  if (path.startsWith('/api/informativa/status/numero/')) {
    return mockDevices.filter(item => item.economico === tail).map(item => ({ ...item, nombre: item.dispositivo }));
  }
  if (path.startsWith('/api/informativa/status/dispositivos/')) {
    return mockDevices.filter(item => item.economico === tail).map(item => ({ ...item, nombre: item.dispositivo }));
  }
  if (path.startsWith('/api/informativa/status/aplicacion/')) {
    const device = mockDevices.find(item => item.ip === tail);
    return device ? [mockDeviceStatus(device)] : [];
  }

  if (path.startsWith('/api/informativa/devices/dispositivos/')) return mockDevices.filter(item => item.nombre === tail);
  if (path.startsWith('/api/informativa/devices/device/')) return mockDevices.filter(item => item.nombre === tail).map(mockDeviceStatus);

  if (path === '/api/informativa/personal/lista/nombres') return mockPeople.map(({ nickname, telefono }) => ({ nickname, telefono }));
  if (path.startsWith('/api/informativa/personal/datos/')) return mockPeople.find(item => item.nickname === tail) || mockPeople[0];
  if (path.startsWith('/api/informativa/personal/foto/')) return null;

  if (path.startsWith('/api/informativa/ubicacion/verificar/')) {
    const found = mockBranches.some(item => item.economico === tail);
    return found ? { economico: tail } : { message: 'No se encontro la sucursal' };
  }
  if (path.startsWith('/api/informativa/ubicacion/datos/')) return mockLocations.find(item => item.economico === tail) || mockLocations[0];
  if (path.startsWith('/api/informativa/ubicacion/imagen/')) return null;

  if (path.startsWith('/api/informativa/mantenimientos/fechas/')) return mockMaintenances.filter(item => item.economico === tail && item.frealizada);
  if (path.startsWith('/api/informativa/mantenimientos/tabla/seleccionado/')) return mockMaintenances.find(item => item.id === Number(tail)) || mockMaintenances[0];
  if (path.startsWith('/api/informativa/mantenimientos/informativa/')) return null;
  if (path.startsWith('/api/informativa/mantenimientos/constancias/')) return [];

  if (path.startsWith('/api/informativa/manuales/info/')) return mockManuals.find(item => item.id === Number(tail)) || mockManuals[0];
  if (path.startsWith('/api/informativa/informes/info/')) return [mockReports.find(item => item.id === Number(tail)) || mockReports[0]];
  if (path.startsWith('/api/informativa/manuales/manual/') || path.startsWith('/api/informativa/informes/informe/')) return null;

  return success(`sin datos configurados para ${path}`);
};

const response = (data, status = 200, contentType = 'application/json') => new Response(
  contentType === 'application/json' ? JSON.stringify(data) : data,
  { status, headers: { 'Content-Type': contentType } },
);

export const mockFetch = async (url, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  await new Promise(resolve => setTimeout(resolve, 120));

  if (url.endsWith('/api/auth/check')) return response({ message: 'No hay sesión iniciada' }, 401);
  if (url.endsWith('/api/auth/out')) return response({ success: true });
  if (url.endsWith('/api/informativa/status/aplicacion/solicitud')) return response(success('solicitud biometrica simulada'));

  if (method !== 'GET') return response(success({ POST: 'registro creado', PUT: 'cambios guardados', DELETE: 'registro eliminado' }[method] || 'accion completada'));

  const data = routeData(url);
  if (data?.message && url.includes('/verificar/')) return response(data, data.economico ? 200 : 404);
  if (url.includes('/personal/foto/') || url.includes('/ubicacion/imagen/') || url.includes('/mantenimientos/informativa/') || url.includes('/mantenimientos/tabla/seleccionado/') || url.includes('/manuales/manual/') || url.includes('/informes/informe/')) {
    return response(new Blob([], { type: 'application/octet-stream' }), 200, 'application/octet-stream');
  }
  return response(data);
};

export const mockAxiosAdapter = async config => {
  if (config.url?.endsWith('/api/auth/login/user')) {
    return { data: { iniciado: mockUser.username }, status: 200, statusText: 'OK', headers: {}, config };
  }
  const result = await mockFetch(config.url, { method: config.method, body: config.data });
  const data = await result.json();
  if (!result.ok) {
    const error = new Error(data.message || 'Error del mock');
    error.response = { status: result.status, data, config };
    throw error;
  }
  return { data, status: result.status, statusText: result.statusText, headers: {}, config };
};

export const mockFetchData = async url => {
  const result = await mockFetch(url);
  const data = await result.json();
  if (!result.ok) throw new Error(data?.message || `Error ${result.status}`);
  return pause(data);
};