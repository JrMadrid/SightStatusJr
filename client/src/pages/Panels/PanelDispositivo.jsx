/* PAGINA DE TABLA DE DISPOSITIVOS Y DE PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS */
import { useContext } from "react";
import { UserContext } from '../../context/UserContext.jsx';
import SelectDispositivos from '../../components/Panel_Dispositivos/SelectDispositivos.jsx';
import DispositivosPanel from '../../components/Panel_Dispositivos/DispositivoPanel.jsx';
import '../css/section.css';

const PanDispositivos = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && ( // TODOS
          <div className='section tabla'>
            <SelectDispositivos />
          </div>
        )}
        {user && (user.id === 1 || user.id === 2) && ( // SUPER ADMINISTRADOR Y ADMINISTRADOR
          <div className='section panel'>
            <DispositivosPanel />
          </div>
        )}
      </div>
    </>
  )
};

export default PanDispositivos;