/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE MANUALES */
import PostManual from './PostManuales';
import DeleteManuales from './DeleteManual';
import UpdateManuales from './UpdateManual';
import '@css/panel.css';

const ManualPanel = () => {

  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <PostManual />
          <UpdateManuales />
          <DeleteManuales />
        </div>
      </div>
    </>
  );
};

export default ManualPanel;