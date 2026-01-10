/* PAGINA DE TABLA DE DISPOSITIVOS Y DE PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS */
import { useContext } from "react";
import { UserContext } from '@context/UserContext.jsx';
import { access } from '@utils/permissions.js';
import SelectDispositivos from '@paneles/Panel_Dispositivos/SelectDispositivos.jsx';
import DispositivosPanel from '@paneles/Panel_Dispositivos/DispositivoPanel.jsx';
import '@cssp/section.css';

const PanDispositivos = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'dispositivos', 'view') && (
          <div className='section tabla'>
            <SelectDispositivos />
          </div>
        )}
        {user && access(user, 'dispositivos', 'edit') && (
          <div className='section panel'>
            <DispositivosPanel />
          </div>
        )}
      </div>
    </>
  )
};

export default PanDispositivos;