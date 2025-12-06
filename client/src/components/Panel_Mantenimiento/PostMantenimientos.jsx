/* PANEL DE ADMINISTRACIÓN DE MANTENIMIENTOS -- CREAR */
import { useState } from 'react';
import axios from '../../api/axiosConfig';

const PostMantenimientos = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    economico: '',
    festimada: '',
  });
  const [message, setMessage] = useState('');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Agregar un nuevo mantenimiento
  const Agregar = async (e) => {
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
      const response = await axios.post(`/panel/mantenimientos/agregar`,
        cleanedData,
        { headers: { "Content-Type": "application/json" } });
      setMessage(response.data.message || 'Mantenimiento agregado exitosamente');
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al agregar el mantenimiento');
      console.error("Error: // Agregar un nuevo mantenimiento, ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='caja agregar'>
        <form onSubmit={Agregar}>
          <h5 className='TitAgregar'>Agregar</h5>
          <label htmlFor="festimada"><span className='ReAgregar'>*</span>Fecha Estimada: </label>
          <input type="date" id="festimada" name="festimada" value={formData.festimada} onChange={cambio} required style={{ marginBottom: '4px' }} />
          <p className="paviso">Mes/Dia/Año</p>
          <label htmlFor="economico"><span className='ReAgregar'>*</span>Económico:</label>
          <input type="text" id="economico" name="economico" maxLength="6" minLength="6" required placeholder='Número económico' title="6 caracteres numéricos" value={formData.economico} onChange={cambio} />
          <div className="add">
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Agregando...' : 'Agregar'}</button>
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

export default PostMantenimientos;