/* PAGINA DE PANEL DE ADMINISTRACIÓN DE USUARIOS */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import SelectUsers from '@paneles/Panel_Users/SelectUsers.jsx';
import UsersPanel from '@paneles/Panel_Users/UsersPanel.jsx';
import '@cssp/section.css';

const PanUsers = () => {
  const user = useContext(UserContext);
  return (
    <>
      {user && user.id === 1 && ( // SUPER ADMINISTRADOR
        <div className='display'>
          <div className='section tabla'>
            <SelectUsers />
          </div>
          <div className='section panel'>
            <UsersPanel />
          </div>
        </div>
      )}
    </>
  );
};

export default PanUsers;