/* PAGINA DE PANEL DE ADMINISTRACIÓN DE USUARIOS */
import { useContext } from 'react';
import { UserContext } from '@context/UserContext.jsx';
import { access } from '@utils/permissions.js';
import SelectUsers from '@paneles/Panel_Users/SelectUsers.jsx';
import UsersPanel from '@paneles/Panel_Users/UsersPanel.jsx';
import '@cssp/section.css';

const PanUsers = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className='display'>
        {user && access(user, 'users', 'view') && (
          <div className='section tabla'>
            <SelectUsers />
          </div>
        )}
        {user && access(user, 'users', 'edit') && (
          <div className='section panel'>
            <UsersPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default PanUsers;