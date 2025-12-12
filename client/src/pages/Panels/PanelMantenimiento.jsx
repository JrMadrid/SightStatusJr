/* PAGINA DE TABLA DE MANTENIMIENTOS Y DE PANEL DE ADMINISTRACIÓN DE MANTENIMIENTOS */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import SelectMantenimientos from '@paneles/Panel_Mantenimiento/SelectMantenimientos.jsx';
import MantenimientosPanel from '@paneles/Panel_Mantenimiento/MantenimientosPanel.jsx';
import ConstanciaPanel from '@paneles/Panel_Mantenimiento/ConstanciaPanel.jsx';
import '@cssp/section.css';

const PanMantenimientos = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && ( // TODOS
          <div className='section tabla'>
            <SelectMantenimientos />
          </div>
        )}
        {user && (user.id === 1 || user.id === 2) && ( // SUPER ADMINISTRADOR Y ADMINISTRADOR
          <div className='section panel'>
            <MantenimientosPanel />
          </div>
        )}
        {user && (user.id === 3 || user.id === 4) && ( // APLICATIVO Y GEOGRAFIA
          <div className='section panel'>
            <ConstanciaPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default PanMantenimientos;