/* PANEL DE ADMINISTRACIÓN DE SUCURSALES -- ELIMINAR */
import { useState } from 'react';
import axios from '@api/axiosConfig';

const DeleteSucursales = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  // Eliminar una sucursal
  const eliminar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = `/api/panel/sucursales/eliminar/${id}`;
      const response = await axios.delete(url);
      setMessage(response.data.message || 'Sucursal eliminada exitosamente');
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al eliminar la sucursal');
      console.error('Error // Eliminar una sucursal, ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='caja eliminar'>
        <h5 className='TitEliminar'>Eliminar</h5>
        <form onSubmit={eliminar}>
          <div className="delete">
            <label htmlFor="id"><span className='ReEliminar'>*</span>ID: </label>
            <p className='paviso'>Dejará sin sucursal a los dispositivos asociados.</p>
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
    </>
  );
};

export default DeleteSucursales;