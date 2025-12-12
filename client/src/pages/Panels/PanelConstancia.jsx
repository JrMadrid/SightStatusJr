/* PAGINA DE PANEL DE ADMINISTRACIÓN DE CONSTANCIAS */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import SelectMantenimientos from '@paneles/Panel_Mantenimiento/SelectMantenimientos.jsx';
import MantenimientosPanel from '@paneles/Panel_Mantenimiento/MantenimientosPanel.jsx';
import '@cssp/section.css';

const PanMantenimientos = () => {
  const user = useContext(UserContext);
  return (
    <>
      {user && (user.id === 1 || user.id === 2) && ( // SUPER ADMINISTRADOR Y ADMINISTRADOR
        <div className='display'>
          <div className='section tabla'>
            <SelectMantenimientos />
          </div>
          <div className='section panel'>
            <MantenimientosPanel />
          </div>
        </div>
      )}
    </>
  );
};

export default PanMantenimientos;