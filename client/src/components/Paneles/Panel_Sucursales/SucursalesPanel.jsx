/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE SUCURSALES */
import PostSucursales from './PostSucursales';
import UpdateSucursales from './UpdateSucursales';
import DeleteSucursales from './DeleteSucursales';
import '@css/panel.css';

const SucursalesPanel = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <PostSucursales />
          <UpdateSucursales />
          <DeleteSucursales />
        </div>
      </div>
    </>
  );
};

export default SucursalesPanel;