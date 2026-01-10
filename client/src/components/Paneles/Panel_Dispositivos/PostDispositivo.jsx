/* PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- CREAR */
import { useState } from 'react';
import useCrudApi from '@hooks/useCrudApi';

const PostDispositivo = () => {
  const [formData, setFormData] = useState({
    ip: '',
    economico: '',
    nombre: '',
    descripcion: ''
  });
  const { create: createDispositivo, loading, message } = useCrudApi('/api/panel/dispositivos');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // Agregar un nuevo dispositivo
  const Agregar = async (e) => {
    e.preventDefault();

    try {
      await createDispositivo(formData);
      window.location.reload();
    } catch (error) {
      console.error('Error: // Agregar un nuevo dispositivo, ', error);
    }
  };

  return (
    <>
      <div className='caja agregar'>
        <h5 className='TitAgregar'>Agregar</h5>
        <form onSubmit={Agregar}>
          <label htmlFor="nombre"><span className='ReAgregar'>*</span>Dispositivo:</label>
          <input type="text" id="nombre" name="nombre" maxLength="75" placeholder='Nombre del dispositivo' title="Nombre del dispositivo" required value={formData.nombre} onChange={cambio} />
          <label htmlFor="ip"><span className='ReAgregar'>*</span>IP:</label>
          <input type="text" id="ip" name="ip" maxLength="15" placeholder='xxx.xxx.xxx.xxx' title='(IPv4)' pattern="((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)" required value={formData.ip} onChange={cambio} />
          <p className='paviso'>Ip especiales inician con</p>
          <p className='paviso'>Sin inventario: 000.</p>
          <p className='paviso'>No aplica: 001.</p>
          <label htmlFor="economico"><span className='ReAgregar'>*</span>Económico:</label>
          <input type="text" id="economico" name="economico" maxLength="6" minLength="6" placeholder='Número económico (Existente)' title="6 caracteres numéricos" required value={formData.economico} onChange={cambio} />
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" name="descripcion" maxLength="100" minLength="0" placeholder='Descripción del Dispositivo (Opcional)' title="100 Caracteres maximos" value={formData.descripcion} onChange={cambio} />
          <label htmlFor="general">General:</label>
          <textarea className='textarea' id="general" name="general" maxLength={8000} placeholder='Información general del dispositivo (Opcional)' title="8000 Caracteres máximos" value={formData.general} onChange={cambio} rows={4} />
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

export default PostDispositivo;