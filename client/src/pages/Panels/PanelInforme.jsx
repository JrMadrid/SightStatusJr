/* PAGINA DE PANEL DE ADMINISTRACIÓN DE INFORMES */
import SelectInformes from '@paneles/Panel_Informes/SelectInformes.jsx';
import InformePanel from '@paneles/Panel_Informes/InformePanel.jsx';
import '@cssp/section.css';

const Informes = () => {
  return (
    <>
      <div className='display'>
        <div className='section tabla'>
          <SelectInformes />
        </div>
        <div className='section panel'>
          <InformePanel />
        </div>
      </div>
    </>
  )
};

export default Informes;