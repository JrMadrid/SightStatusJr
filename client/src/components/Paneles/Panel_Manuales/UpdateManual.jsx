/* PANEL DE ADMINISTRACIÓN DE MANUALES -- ACTUALIZAR */
import { useState } from 'react';
import axios from '@api/axiosConfig';

const PostManual = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Actualizar un manual
  const Actualizar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
       const cleanedData = {};
      for (const key in formData) {
        let value = formData[key];
        if (typeof value === 'string') {
          value = value.trim();
        }
        if (value !== '') {
          cleanedData[key] = value;
        }
      };
      const url = `/api/panel/manuales/actualizar/${id}`;
      const response = await axios.put(url,
        cleanedData,
        { headers: { "Content-Type": "application/json" } });
      setMessage(response.data.message || 'Manual actualizado exitosamente');
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al actualizar el manual');
    } finally {
      setLoading(false);
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