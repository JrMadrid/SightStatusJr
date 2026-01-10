/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS */
import PostDispositivo from "./PostDispositivo";
import UpdateDispositivo from "./UpdateDispositivo";
import DeleteDispositivo from "./DeleteDispositivo";
import '@css/panel.css';

const DispositivosPanel = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <PostDispositivo />
          <UpdateDispositivo />
          <DeleteDispositivo />
        </div >
      </div >
    </>
  )
};

export default DispositivosPanel;