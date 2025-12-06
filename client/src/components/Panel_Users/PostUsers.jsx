/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- CREAR */
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from '../../api/axiosConfig';

const PostUsers = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    psw: '',
    tipo: 'Geografia',
    activo: 'si'
  });
  const [message, setMessage] = useState('');

  const cambio = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {

      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked ? 1 : 0
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  // Agregar un nuevo usuario
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
      const response = await axios.post(`/panel/users/agregar`,
        cleanedData,
        { headers: { "Content-Type": "application/json" } });
      setMessage(response.data.message || 'Usuario agregado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error('Error: // Agregar un nuevo usuario, ', error);
      setMessage(error.response?.data?.message || 'Error al agregar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='caja agregar'>
        <h5 className='TitAgregar'>Agregar</h5>
        <form onSubmit={Agregar}>
          <label htmlFor="nickname"><span className='ReAgregar'>*</span>Nombre:</label>
          <input type="text" id="nickname" name="nickname" maxLength="50" required placeholder='Nombre del Usuario' title="Nombre del Usuario" value={formData.nickname} onChange={cambio} />
          <label htmlFor="psw"><span className='ReAgregar'>*</span>Contraseña:</label>
          <input type="text" id="psw" name="psw" maxLength="50" required placeholder='Contraseña del Usuario' title='Contraseña del Usuario' value={formData.psw} onChange={cambio} />
          <label htmlFor="usuarios"><span className='ReAgregar'>*</span>Usuario:</label>
          <select id="usuarios" name="tipo" className='usuarios' title='Tipo de Usuario' value={formData.tipo} onChange={cambio} required>
            <option value="Geografia" >Geografía</option>
            <option value="Aplicativo" >Aplicativo</option>
            <option value="Administrador" >Administrador</option>
          </select>
          <div className='re-options'>
            <label><span className='ReAgregar'>*</span><FaUser style={{ fontSize: '0.7rem' }} />  Activo:</label>
            <input id='siActivo' type="radio" name="activo" value="si" checked={formData.activo === 'si'} onChange={cambio} required/>
            <label className='re-boolean' htmlFor='siActivo'>Sí</label>
            <input id='noActivo' type="radio" name="activo" value="no" checked={formData.activo === 'no'} onChange={cambio} />
            <label className='re-boolean' htmlFor='noActivo'>No</label>
          </div>
          <div className="add">
            <button type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Agregando...' : 'Agregar'}</button>
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

export default PostUsers;