/* PANEL DE ADMINISTRACIÓN DE INFORMES -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCrudApi from '@hooks/useCrudApi';
import usePageTitle from '@hooks/usePageTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectInformes = () => {
  usePageTitle("Informes");
  const navigate = useNavigate();
  const { read: readInformes, message } = useCrudApi('/api/panel/informes');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los informes
  useEffect(() => {
    const informes = async () => {
      try {
        const datos = await readInformes();
        setData(datos);
        setCount(datos.length)
      } catch (error) {
        console.error('Error: // Pedir los datos de los informes, ', error);
        toast.error(message || 'Error con los datos')
      }
    };

    informes();
  }, []);

  // Pedir el informe en formato PDF
  const eleccion = async (id, nombre = 'Informe') => {
    const urle = `/api/panel/informe/${id}`;
    try {
      const response = await fetch(urle, { credentials: 'include' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
      }
      const InformeBlob = await response.blob(); // Convertir la respuesta a un Blob
      const blob = new Blob([InformeBlob], { type: 'application/pdf' }); // Crear un nuevo Blob con el tipo de contenido PDF
      const url = window.URL.createObjectURL(blob); // Crear una URL para el Blob
      const a = document.createElement('a'); // Crear un elemento <a> para descargar el archivo
      a.href = url; // Asignar la URL al atributo href del elemento <a>
      a.download = `${nombre}`;
      document.body.appendChild(a); // Añadir el elemento <a> al DOM
      a.click(); // Simular un clic en el elemento <a> para iniciar la descarga
      document.body.removeChild(a); // Eliminar el elemento <a> del DOM
      window.URL.revokeObjectURL(url); // Liberar la URL del Blob

    } catch (error) {
      console.error('Error: // Pedir el informe en formato PDF, ', error);
      toast.error(error.message || 'Error con el informe')
    }
  };

  // Pedir el id del informe
  const ver = async (id) => {
    navigate(`/informativa/informe`, { state: { id } });
  };

  return (
    <>
      <Paginador tipo='informes' data={data} excel='si' cantidad={count} eleccion={eleccion} ver={ver} />
    </>
  );
};

export default SelectInformes;