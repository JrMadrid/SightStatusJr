/* PAGINA DE PANEL DE ADMINISTRACIÓN DE MANUALES */
import SelectManuales from '@paneles/Panel_Manuales/SelectManuales.jsx';
import ManualPanel from '@paneles/Panel_Manuales/ManualPanel.jsx';
import '@cssp/section.css';

const PanManuales = () => {
  return (
    <>
      <div className='display'>
        <div className='section tabla'>
          <SelectManuales />
        </div>
        <div className='section panel'>
          <ManualPanel />
        </div>
      </div>
    </>
  )
}

export default PanManuales;