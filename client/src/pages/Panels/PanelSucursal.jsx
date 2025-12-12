/* PAGINA DE TABLA DE SUCURSALES Y DE PANEL DE ADMINISTRACIÓN DE SUCURSALES */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import SelectSucursales from '@paneles/Panel_Sucursales/SelectSucursales.jsx';
import SucursalesPanel from '@paneles/Panel_Sucursales/SucursalesPanel.jsx';
import '@cssp/section.css';

const PanSucursales = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && ( // TODOS
          <div className='section tabla'>
            <SelectSucursales />
          </div>
        )}
        {user && (user.id === 1 || user.id === 2) && ( // SUPER ADMINISTRADOR Y ADMINISTRADOR
          <div className='section panel'>
            <SucursalesPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default PanSucursales;