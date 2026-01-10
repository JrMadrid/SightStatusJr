/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE MANTENIMIENTOS Y CONSTANCIAS */
import PostMantenimientos from './PostMantenimientos';
import UpdateMantenimientos from './UpdateMantenimiento';
import DeleteMantenimientos from './DeleteMantenimientos';
import PostConstancia from './PostConstancia';
import '@css/panel.css';

export const MantenimientosPanel = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <PostMantenimientos />
          <UpdateMantenimientos />
          <DeleteMantenimientos />
        </div>
      </div>
    </>
  );
};

export const ConstanciaPanel = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Mantenimiento</h3>
        <div className='cajahija'>
          <PostConstancia />
        </div>
      </div>
    </>
  );
};