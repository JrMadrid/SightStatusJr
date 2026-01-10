/* PAGINA DE TABLA DE SUCURSALES Y DE PANEL DE ADMINISTRACIÓN DE SUCURSALES */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import { access } from '@utils/permissions.js';
import SelectSucursales from '@paneles/Panel_Sucursales/SelectSucursales.jsx';
import SucursalesPanel from '@paneles/Panel_Sucursales/SucursalesPanel.jsx';
import '@cssp/section.css';

const PanSucursales = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'sucursales', 'view') && (
          <div className='section tabla'>
            <SelectSucursales />
          </div>
        )}
        {user && access(user, 'sucursales', 'edit') && (
          <div className='section panel'>
            <SucursalesPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default PanSucursales;