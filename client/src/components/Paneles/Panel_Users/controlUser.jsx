/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- CONTROLAR */
import useControlUsers from '@hooks/useControlUsers';

const ControlUsers = () => {
  const { ejecutar } = useControlUsers();

  // Cerrar la sesión de todos los usuarios
  const desconectar = () => {
    ejecutar(
      '/api/panel/users/logoutall',
      'Se cerraron todas las sesiones'
    );
  };

  // Desactivar el acceso de todos los usuarios
  const desactivar = () => {
    ejecutar(
      '/api/panel/users/deactivateall',
      'Se desactivaron todos los usuarios',
      true
    );
  };

  // Activar el acceso de todos los usuarios
  const activar = () => {
    ejecutar(
      '/api/panel/users/activateall',
      'Se activaron todos los usuarios',
      true
    );
  };

  return (
    <>
      <div className='caja' style={{ backgroundColor: 'black' }}>
        <p className='paviso'>Lo siguiente no le afectará</p>
        <button className='desconectar' onClick={() => { desconectar(); }}>Desconectar usuarios</button>
        <p className='paviso'>Cerrará la sesión de todos los usuarios conectados</p>
        <button className='desconectar' onClick={() => { desactivar(); }}>Desactivar usuarios</button>
        <p className='paviso'>Se desactivará el acceso a todos los usuarios</p>
        <button className='desconectar' onClick={() => { activar(); }}>Activar usuarios</button>
        <p className='paviso'>Se activará el acceso a todos los usuarios</p>
      </div>
    </>
  );
};

export default ControlUsers;