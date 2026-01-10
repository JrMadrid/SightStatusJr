/* COMPONENTE DE PANEL DE ADMINISTRACIÓN DE INFORMES */
import PostInforme from './PostInforme';
import DeleteInforme from './DeleteInforme';
import '@css/panel.css';

export const InformePanelSU = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Administración</h3>
        <div className='cajahija'>
          <DeleteInforme />
        </div>
      </div>
    </>
  );
};

export const InformePanelGeo = () => {
  return (
    <>
      <div className='cajamadre'>
        <h3>Informe</h3>
        <div className='cajahija'>
          <PostInforme />
        </div>
      </div>
    </>
  );
};