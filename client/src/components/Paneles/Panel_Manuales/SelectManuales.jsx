/* PANEL DE ADMINISTRACIÓN DE MANUALES -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCrudApi from '@hooks/useCrudApi';
import usePageTitle from '@hooks/usePageTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectManuales = () => {
  usePageTitle("Manuales");
  const navigate = useNavigate();
  const { read: readManuales, message } = useCrudApi('/api/panel/manuales');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los manuales
  useEffect(() => {
    const manuales = async () => {
      try {
        const datos = await readManuales();
        setData(datos);
        setCount(datos.length);
      } catch (error) {
        console.error('Error: // Pedir los datos de los manuales, ', error);
        toast.error(error.message || 'Error con los datos');
      }
    };

    manuales();
  }, []);

  // Pedir el manual en formato PDF
  const eleccion = async (id, nombre = 'Manual') => {
    let urle = `/api/panel/manual/${id}`;
    try {
      const response = await fetch(urle, { credentials: 'include' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
      }
      const ManualBlob = await response.blob(); // Convertir la respuesta a un Blob
      const blob = new Blob([ManualBlob], { type: 'application/pdf' }); // Crear un nuevo Blob con el tipo de contenido PDF
      const url = window.URL.createObjectURL(blob); // Crear una URL para el Blob
      const a = document.createElement('a'); // Crear un elemento <a> para descargar el archivo
      a.href = url; // Asignar la URL al atributo href del elemento <a>
      a.download = `${nombre}`;
      document.body.appendChild(a); // Añadir el elemento <a> al DOM
      a.click(); // Simular un clic en el elemento <a> para iniciar la descarga
      document.body.removeChild(a); // Eliminar el elemento <a> del DOM
      window.URL.revokeObjectURL(url); // Liberar la URL del Blob
    } catch (error) {
      console.error('Error: // Pedir el manual en formato PDF, ', error);
      toast.error(error.message || 'Error con el manual');
    }
  };

  // Pedir el id del manual
  const ver = async (id) => {
    navigate(`/informativa/manual`, { state: { id } });
  };

  return (
    <>
      <Paginador tipo='manuales' data={data} cantidad={count} eleccion={eleccion} ver={ver} />
    </>
  );
};

export default SelectManuales;