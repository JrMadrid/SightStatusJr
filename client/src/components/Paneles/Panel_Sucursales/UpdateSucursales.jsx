/* PANEL DE ADMINISTRACIÓN DE SUCURSALES -- ACTUALIZAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const UpdateSucursales = () => {
  const [formData, setFormData] = useState({
    canal: '',
    nombre: '',
    economico: '',
    ingresponsable: '',
    rellenar: ''
  });
  const { update: updateSucursal, loading, message } = useCrudApi('/api/panel/sucursales');
  const [id, setId] = useState('');

  const cambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'radio' ? value : type === 'checkbox' ? checked : value
    }));
  };

  // Actualizar una sucursal
  const actualizar = async (e) => {
    e.preventDefault();

    try {
      await updateSucursal(id, formData);
      window.location.reload();
    } catch (err) {
      console.error('Error: // Actualizar una sucursal, ', err);
    }
  };

  return (
    <>
      <div className='caja actualizar'>
        <form onSubmit={actualizar}>
          <h5 className='TitActualizar'>Actualizar</h5>
          <label htmlFor="economico">Económico:</label>
          <p className='paviso'>También cambiará el económico de los dispositivos asociados.</p>
          <input type="text" id="economico" name="economico" maxLength="6" minLength="6" placeholder='Número económico (Opcional)' title=" 6 caracteres numéricos (Opcional)" value={formData.economico} onChange={cambio} />
          <label htmlFor="canal">Canal:</label>
          <input type="text" id="canal" name="canal" maxLength="30" placeholder='Canal de la Sucursal (Opcional)' title='Canal (Opcional)' value={formData.canal} onChange={cambio} />
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" maxLength="50" placeholder='Nombre de la Sucursal (Opcional)' title='Nombre (Opcional)' value={formData.nombre} onChange={cambio} />
          <label htmlFor="ingresponsable">Ing. Responsable:</label>
          <input type="text" id="ingresponsable" name="ingresponsable" maxLength="50" placeholder='Ingeniero responsable' title="Ingeniero responsable (Opcional)" value={formData.ingresponsable} onChange={cambio} />
          <div className='re-options'>
            <label>Rellenar:</label>
            <input id='siRellenarA' type="radio" name="rellenar" value="yes" checked={formData.rellenar === 'yes'} onChange={cambio} />
            <label className='re-boolean' htmlFor='siRellenarA'>Sí</label>
            <input id='noRellenarA' type="radio" name="rellenar" value="no" checked={formData.rellenar === 'no'} onChange={cambio} />
            <label className='re-boolean' htmlFor='noRellenarA'>No</label>
            <input id='nadaA' type="radio" name="rellenar" value="" checked={formData.rellenar === ''} onChange={cambio} />
            <label className='re-boolean' htmlFor='nadaA'></label>
          </div>
          <p className='paviso'>(Opcional)</p>
          <p className='paviso'>Rellenará la sucursal con los dispositivos que le falten</p>
          <p className='paviso'>"Sin inventario"</p>
          <div className="update">
            <label htmlFor="id"><span className='ReActualizar'>*</span>ID:</label>
            <input type="text" id="id" name="id" maxLength="5" required placeholder='Elemento que actualizara' title='ID' min='1' pattern='\d{1,5}' value={id} onChange={(e) => { setId(e.target.value) }} />
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
          </div>
        </form>
        <div className='avisos'>
          {message && message.split('\n').map((linea, i) => (
            <p key={i}>{linea}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpdateSucursales;