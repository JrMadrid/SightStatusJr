/* PANEL DE ADMINISTRACIÓN DE MANUALES -- ELIMINAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const DeleteManuales = () => {
  const { remove: deleteManual, loading, message } = useCrudApi('/api/panel/manuales');
  const [id, setId] = useState('');

  // Eliminar un manual
  const eliminar = async (e) => {
    e.preventDefault();

    try {
      await deleteManual(id);
      window.location.reload();
    } catch (error) {
      console.error('Error: // Eliminar un manual, ', error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default DeleteManuales;