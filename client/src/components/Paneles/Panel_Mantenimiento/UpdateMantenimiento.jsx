/* PANEL DE ADMINISTRACIÓN DE SUCURSALES -- ACTUALIZAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const UpdateMantenimientos = () => {
  const [formData, setFormData] = useState({
    economico: '',
    festimada: '',
  });
  const { update: updateMantenimiento, loading, message } = useCrudApi('/api/panel/mantenimientos');
  const [id, setId] = useState('');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Actualizar un mantenimiento
  const Actualizar = async (e) => {
    e.preventDefault();

    try {
      await updateMantenimiento(id, formData);
      window.location.reload();
    } catch (error) {
      console.error("Error: // Actualizar un mantenimiento, ");
    }
  };

  return (
    <>
      <div className='caja actualizar'>
        <form onSubmit={Actualizar}>
          <h5 className='TitActualizar'>Actualizar</h5>
          <label htmlFor="festimada">Fecha Estimada: </label>
          <input type="date" id="festimada" name="festimada" value={formData.festimada} onChange={cambio} style={{ marginBottom: '4px' }} />
          <p className="paviso">Mes/Dia/Año</p>
          <label htmlFor="economico">Económico:</label>
          <input type="text" id="economico" name="economico" maxLength="6" minLength="6" placeholder='Número económico' title="6 caracteres numéricos" value={formData.economico} onChange={cambio} />
          <div className="update">
            <label htmlFor="id"><span className='ReActualizar'>*</span>ID: </label>
            <input type="text" id="id" name="id" maxLength="5" placeholder='Elemento que actualizara' title='ID' pattern='\d{1,5}' value={id} onChange={(e) => setId(e.target.value)} required />
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
          </div>
        </form>
        <div className='avisos'>
          {message && message.split('\n').map((linea, i) => (
            <p key={i}>{linea}</p>
          ))}
        </div>
      </div >
    </>
  );
};

export default UpdateMantenimientos;