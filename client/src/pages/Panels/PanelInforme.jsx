/* PAGINA DE PANEL DE ADMINISTRACIÓN DE INFORMES */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import { access } from '@utils/permissions.js';
import SelectInformes from '@paneles/Panel_Informes/SelectInformes.jsx';
import { InformePanelSU, InformePanelGeo } from '@paneles/Panel_Informes/InformePanel.jsx';
import '@cssp/section.css';

const Informes = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'informes', 'view') && (
          <div className='section tabla'>
            <SelectInformes />
          </div>
        )}
        {user && access(user, 'informes', 'edit') && (
          <div className='section panel'>
            <InformePanelSU />
          </div>
        )}
        {user && access(user, 'informes', 'add') && (
          <div className='section panel'>
            <InformePanelGeo />
          </div>
        )}
      </div>
    </>
  )
};

export default Informes;