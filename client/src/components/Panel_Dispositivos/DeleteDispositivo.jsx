/* PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- ELIMINAR */
import { useState } from 'react';
import axios from '../../api/axiosConfig';

const DeleteDispositivo = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  // Eliminar un dispositivo
  const Eliminar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.delete(`/panel/dispositivos/eliminar/${id}`);
      setMessage(response.data.message || 'Dispositivo eliminado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error(' Error: // Eliminar un dispositivo, ', error);
      setMessage(error.response?.data?.message || 'Error al eliminar el dispositivo');
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className='caja eliminar'>
        <h5 className='TitEliminar'>Eliminar</h5>
        <form onSubmit={Eliminar}>
          <div className="delete">
            <label htmlFor="id"><span className='ReEliminar'>*</span>ID:</label>
            <input type="text" id="id" name="id" maxLength="5" placeholder='Elemento que eliminara' title='ID' pattern='\d{1,5}' required value={id} onChange={(e) => setId(e.target.value)} />
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Eliminando...' : 'Eliminar'}</button>
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

export default DeleteDispositivo;