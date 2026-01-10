/* PAGINA DE TABLA DE MANTENIMIENTOS Y DE PANEL DE ADMINISTRACIÓN DE MANTENIMIENTOS Y CONSTANCIAS */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import { access } from '@utils/permissions.js';
import SelectMantenimientos from '@paneles/Panel_Mantenimiento/SelectMantenimientos.jsx';
import { MantenimientosPanel, ConstanciaPanel } from '@paneles/Panel_Mantenimiento/MantenimientosPanel.jsx';
import '@cssp/section.css';

const PanMantenimientos = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'mantenimientos', 'view') && (
          <div className='section tabla'>
            <SelectMantenimientos />
          </div>
        )}
        {user && access(user, 'mantenimientos', 'edit') && (
          <div className='section panel'>
            <MantenimientosPanel />
          </div>
        )}
        {user && access(user, 'mantenimientos', 'add') && (
          <div className='section panel'>
            <ConstanciaPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default PanMantenimientos;