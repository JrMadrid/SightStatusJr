/* PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- ELIMINAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const DeleteDispositivo = () => {
  const { remove: deleteDispositivo, loading, message } = useCrudApi('/api/panel/dispositivos');
  const [id, setId] = useState('');

  // Eliminar un dispositivo
  const Eliminar = async (e) => {
    e.preventDefault();

    try {
      await deleteDispositivo(id);
      window.location.reload();
    } catch (error) {
      console.error('Error: // Eliminar un dispositivo, ', error);
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