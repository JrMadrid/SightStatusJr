/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- ACTUALIZAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';
import { FaUser } from 'react-icons/fa';

const UpdateUsers = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    psw: '',
    tipo: '',
    activo: ''
  });
  const { update: updateUser, loading, message } = useCrudApi('/api/panel/users');
  const [id, setId] = useState('');

  const cambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'radio' ? value : type === 'checkbox' ? checked : value
    }));
  };

  // Actualizar un usuario
  const actualizar = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, formData);
      window.location.reload();
    } catch (err) {
      console.error('Error: // Actualizar un usuario, ', err);
    }
  };

  return (
    <>
      <div className='caja actualizar'>
        <h5 className='TitActualizar'>Actualizar</h5>
        <form onSubmit={actualizar}>
          <label htmlFor="nickname">Nombre:</label>
          <input type="text" id="nickname" name="nickname" maxLength="50" placeholder='Nombre del Usuario (Opcional)' title="Nombre del Usuario (Opcional)" value={formData.nickname} onChange={cambio} />
          <label htmlFor="psw">Contraseña:</label>
          <input type="text" id="psw" name="psw" maxLength="50" placeholder='Contraseña del Usuario (Opcional)' title='Contraseña del Usuario (Opcional)' value={formData.psw} onChange={cambio} />
          <label htmlFor="usuarios">Usuario:</label>
          <select id="usuarios" name="tipo" className='usuarios' title='Tipo de Usuario' value={formData.tipo} onChange={cambio}>
            <option value="" className='tipousuario'>Seleccione: (Opcional)</option>
            <option value="Geografia" >Geografía</option>
            <option value="Aplicativo" >Aplicativo</option>
            <option value="Administrador" >Administrador</option>
          </select>
          <div className='re-options'>
            <label><FaUser style={{ fontSize: '0.7rem' }} />  Activo:</label>
            <input id='siActivoAc' type="radio" name="activo" value="si" checked={formData.activo === 'si'} onChange={cambio} />
            <label className='re-boolean' htmlFor='siActivoAc'>Sí</label>
            <input id='noActivoAc' type="radio" name="activo" value="no" checked={formData.activo === 'no'} onChange={cambio} />
            <label className='re-boolean' htmlFor='noActivoAc'>No</label>
          </div>
          <div className='update'>
            <label htmlFor="id"><span className='ReActualizar'>*</span>ID:</label>
            <input type="text" id="id" name="id" maxLength="5" required placeholder='Elemento que actualizará' title="Elemento que actualizará" value={id} onChange={(e) => { setId(e.target.value) }} />
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
          </div>
        </form >
        <div className='avisos'>
          {message && message.split('\n').map((linea, i) => (
            <p key={i}>{linea}</p>
          ))}
        </div>
      </div >
    </>
  );
};

export default UpdateUsers;