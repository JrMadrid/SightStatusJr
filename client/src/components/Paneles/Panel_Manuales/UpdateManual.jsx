/* PANEL DE ADMINISTRACIÓN DE MANUALES -- ACTUALIZAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const PostManual = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const { update: updateManual, loading, message } = useCrudApi('/api/panel/manuales');
  const [id, setId] = useState('');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Actualizar un manual
  const Actualizar = async (e) => {
    e.preventDefault();

    try {
      await updateManual(id, formData);
      window.location.reload();
    } catch (error) {
      console.error('Error: // Actualizar un manual, ', error);
    }
  };

  return (
    <>
      <div className='caja actualizar'>
        <form onSubmit={Actualizar}>
          <h5 className='TitActualizar'>Actualizar</h5>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" id="nombre" name="nombre" maxLength="100" placeholder="Nombre del manual (Opcional)" value={formData.nombre} onChange={cambio} />
          <label htmlFor="descripcion" style={{ marginTop: '5px' }}>Descripción:</label>
          <textarea className='textarea' style={{ marginTop: '5px' }} id="descripcion" name="descripcion" maxLength="100" placeholder="Descripción del manual (Opcional)" title="100 Caracteres máximos" value={formData.descripcion} onChange={cambio} rows={4} />
          <div className='update'>
            <label htmlFor="id"><span className='ReActualizar'>*</span>ID:</label>
            <input type="text" id="id" name="id" maxLength="5" required placeholder='Elemento que actualizará' title="Elemento que actualizará" value={id} onChange={(e) => { setId(e.target.value) }} />
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

export default PostManual;