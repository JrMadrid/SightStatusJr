/* PAGINA DE PANEL DE ADMINISTRACIÓN DE MANUALES */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import { access } from '@utils/permissions.js';
import SelectManuales from '@paneles/Panel_Manuales/SelectManuales.jsx';
import ManualPanel from '@paneles/Panel_Manuales/ManualPanel.jsx';
import '@cssp/section.css';

const PanManuales = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'manuales', 'view') && (
          <div className='section tabla'>
            <SelectManuales />
          </div>
        )}
        {user && access(user, 'manuales', 'edit') && (
          <div className='section panel'>
            <ManualPanel />
          </div>
        )}
      </div>
    </>
  )
}

export default PanManuales;