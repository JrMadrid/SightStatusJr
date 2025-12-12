/* PANEL DE ADMINISTRACIÓN DE INFORMES -- CREAR */
import { useState } from 'react';
import axios from '@api/axiosConfig';

const PostInforme = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    archivo: null,
    nombre: '',
    economico: '',
    frealizada: '',
    descripcion: '',
  });
  const [message, setMessage] = useState('');
  const [documento, setDocumento] = useState('Sin documento');

  const cambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const cambioArchivo = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      const fileType = file.type; // Obtener el tipo de archivo
      if (fileType === 'application/pdf') { // Verificar si el tipo de archivo es PDF
        setDocumento(file.name); // Guardar el nombre del archivo en el estado
        setFormData({ ...formData, archivo: file }); // Actualizar el estado con el archivo seleccionado
      } else {
        setMessage('Solo se permiten archivos .pdf');
        setDocumento('Sin documento');
        setFormData({ ...formData, archivo: null });
      }
    } else {
      setDocumento('Sin documento');
    }
  };

  // Agregar un nuevo informe
  const Agregar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.archivo) {
        setMessage('Por favor, suba un archivo válido (.pdf).');
        setLoading(false);
        return;
      };
      if (formData.descripcion.length > 100) {
        setMessage('La descripción debe tener máximo 100 caracteres.');
        setLoading(false);
        return;
      };
      const cleanedData = {};
      for (const key in formData) {
        let value = formData[key];
        if (typeof value === 'string') {
          value = value.trim();
        }
        cleanedData[key] = value;
      };
      const DatosParaEnviar = new FormData();
      DatosParaEnviar.append('informe', formData.archivo); // Agregar el archivo al FormData
      DatosParaEnviar.append('nombre', cleanedData.nombre);
      DatosParaEnviar.append('economico', cleanedData.economico);
      DatosParaEnviar.append('frealizada', cleanedData.frealizada);
      DatosParaEnviar.append('descripcion', cleanedData.descripcion);
      DatosParaEnviar.append('documento', documento);
      const url = `/api/panel/informes/agregar`;
      const response = await axios.post(url,
        DatosParaEnviar,
        { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage(response.data.message || 'Informe agregado exitosamente');
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al agregar el informe');
      console.error('Error: // Agregar un nuevo informe, ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='caja agregar'>
        <form onSubmit={Agregar}>
          <h5 className='TitAgregar'>Agregar</h5>
          <label><span className='ReAgregar' style={{ fontSize: '1.2rem', paddingLeft: '3px' }}>*</span>Informe: </label>
          <label htmlFor="informe" className="subirConstancia" style={{ marginTop: '5px' }}>
            Subir Informe
          </label>
          <p className="paviso">Solo archivos .pdf</p>
          <input type="file" id="informe" onChange={cambioArchivo} style={{ display: 'none' }} accept=".pdf" required />
          <div className='avisos'>
            {documento && <p>{documento}</p>}
          </div>
          <label htmlFor="economico" style={{ marginTop: '5px' }}><span className='ReAgregar'>*</span>Económico:</label>
          <input type="text" id="economico" name="economico" maxLength="6" minLength="6" required placeholder='Número económico' title="6 caracteres numéricos" value={formData.economico} onChange={cambio} />
          <label htmlFor="frealizada"><span className='ReAgregar'>*</span>Fecha Realizado: </label>
          <input type="date" id="frealizada" name="frealizada" value={formData.frealizada} onChange={cambio} required style={{ marginBottom: '4px' }} />
          <p className="paviso">Mes/Dia/Año</p>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" id="nombre" name="nombre" maxLength="100" placeholder="Nombre del informe (Opcional)" value={formData.nombre} onChange={cambio} style={{ marginBottom: '4px' }} />
          <p className='paviso'>Se puede tomar directo del documento</p>
          <label htmlFor="descripcion" style={{ marginTop: '5px' }}>Descripción:</label>
          <textarea className='textarea' style={{ marginTop: '5px' }} id="descripcion" name="descripcion" maxLength="100" placeholder="Descripción del informe (Opcional)" title="100 Caracteres máximos" value={formData.descripcion} onChange={cambio} rows={4} />
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

export default PostInforme;