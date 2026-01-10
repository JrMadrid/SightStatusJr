/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE USUARIOS */
import PostUsers from "./PostUsers";
import UpdateUsers from "./UpdateUsers";
import DeleteUsers from "./DeleteUsers";
import ControlUsers from './controlUser';
import '@css/panel.css';

const UsersPanel = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <PostUsers />
          <UpdateUsers />
          <DeleteUsers />
          <ControlUsers />
        </div >
      </div >
    </>
  );
};

export default UsersPanel;