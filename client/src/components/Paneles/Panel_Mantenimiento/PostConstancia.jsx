/* PANEL DE ADMINISTRACIÓN DE CONSTANCIAS -- CREAR */
import { useState } from 'react';
import axios from '@api/axiosConfig';

const PostConstancia = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imagen: null,
    frealizada: '',
    descripcion: '',
    id: ''
  });
  const [message, setMessage] = useState('');
  const [constancia, setConstancia] = useState('Sin constancia');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualizar el estado con el nuevo valor
  };

  const cambioArchivo = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/jpg') { // Verificar si el tipo de archivo es JPEG
        setConstancia(file.name);
        setFormData({ ...formData, imagen: file });
      } else {
        setMessage('Solo se permiten archivos .jpg o .jpeg');
        setConstancia('Sin constancia');
        setFormData({ ...formData, imagen: null });
      }
    } else {
      setConstancia('Sin constancia');
    }
  };

  // Agregar constancia de mantenimiento
  const Agregar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.imagen) {
        setMessage('Por favor, suba una imagen válida (.jpg o .jpeg).');
        setLoading(false);
        return;
      }
      const cleanedData = {};
      for (const key in formData) {
        let value = formData[key];
        if (typeof value === 'string') {
          value = value.trim();
        }
        cleanedData[key] = value;
      };
      const DatosParaEnviar = new FormData(); // Crear un nuevo objeto FormData
      DatosParaEnviar.append('imagen', cleanedData.imagen); // Agregar la imagen al FormData
      DatosParaEnviar.append('frealizada', cleanedData.frealizada);
      DatosParaEnviar.append('descripcion', cleanedData.descripcion);
      DatosParaEnviar.append('id', cleanedData.id);
      const url = `/api/panel/mantenimientos/constancia`;
      const response = await axios.post(url,
        DatosParaEnviar,
        { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage(response.data.message || 'Mantenimiento agregado exitosamente');
      window.location.reload(); // Recargar la página para ver el nuevo mantenimiento
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al agregar el mantenimiento');
      console.error("Error: // Agregar constancia de mantenimiento, ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='caja agregar'>
        <form onSubmit={Agregar}>
          <h5 className='TitAgregar'>Agregar</h5>
          <label htmlFor="frealizada"><span className='ReAgregar'>*</span>Fecha Realizado: </label>
          <input type="date" id="frealizada" name="frealizada" value={formData.frealizada} onChange={cambio} required style={{ marginBottom: '4px' }} />
          <p className="paviso">Mes/Dia/Año</p>
          <label><span className='ReAgregar' style={{ fontSize: '1.2rem', paddingLeft: '3px' }}>*</span>Constancia: </label>
          <label htmlFor="constancia" className="subirConstancia" style={{ marginTop: '5px' }}>
            Subir constancia
          </label>
          <p className="paviso">Solo imágenes .jpg o .jpeg</p>
          <input type="file" id="constancia" onChange={cambioArchivo} style={{ display: 'none' }} accept=".jpg, .jpeg" required />
          <div className='avisos'>
            {constancia && <p>{constancia}</p>}
          </div>
          <label htmlFor="descripcion" style={{ marginTop: '5px' }}>Descripción:</label>
          <textarea className='textarea' style={{ marginTop: '5px' }} id="descripcion" name="descripcion" maxLength={8000} placeholder='Descripción general del mantenimiento (Opcional)' title="8000 Caracteres máximos" value={formData.descripcion} onChange={cambio} rows={4} />
          <div className="add">
            <label htmlFor="id"><span className='ReAgregar'>*</span>ID: </label>
            <input type="text" id="id" name="id" maxLength="5" placeholder='Elemento que agregará' title='ID' pattern='\d{1,5}' value={formData.id} onChange={cambio} required />
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

export default PostConstancia;

