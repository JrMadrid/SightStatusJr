/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- ELIMINAR */
import { useState } from 'react';
import axios from '@api/axiosConfig';

const DeleteUsers = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  // Eliminar un usuario
  const eliminar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = `/api/panel/users/eliminar/${id}`;
      const response = await axios.delete(url);
      setMessage(response.data.message || 'Usuario eliminado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error('Error: // Eliminar un usuario, ', error);
      setMessage(error.response?.data?.message || 'Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='caja eliminar'>
      <h5 className='TitEliminar'>Eliminar</h5>
      <form onSubmit={eliminar}>
        <div className="delete">
          <label htmlFor="id"><span className='ReEliminar'>*</span>ID: </label>
          <input type="text" id="id" name="id" maxLength="5" placeholder='Elemento que eliminará' title='ID' pattern='\d{1,5}' value={id} onChange={(e) => { setId(e.target.value) }} required />
          <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Eliminando...' : 'Eliminar'}</button>
        </div>
      </form>
      <div className='avisos'>
        {message && message.split('\n').map((linea, i) => (
          <p key={i}>{linea}</p>
        ))}
      </div>
    </div>
  );
};

export default DeleteUsers;