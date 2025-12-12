/* TABLA DE MANTENIMIENTOS Y PANEL DE ADMINISTRACIÓN DE MANTENIMIENTOS -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import fetchData from '@api/fetchConfig.js';
import usePageTitle from '@hooks/documentTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectMantenimientos = () => {
  usePageTitle("Mantenimientos");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los mantenimientos
  useEffect(() => {
    const url = `/api/panel/mantenimientos`;
    const mantenimientos = async () => {
      try {
        const datos = await fetchData(url);
        setData(datos);
        setCount(datos.length)
      } catch (error) {
        console.error('Error: // Pedir los datos de los mantenimientos, ', error);
        toast.error(error.message || 'Error con los dataos')
      }
    };

    mantenimientos();
  }, []);

  // Mandar el documento del mantenimiento seleccionado
  const eleccion = async (id, eco, fechacons) => {
    const urle = `/api/informativa/mantenimientos/tabla/seleccionado/${id}`;
    try {
      const response = await fetch(urle, { credentials: 'include' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
      }
      // Obtener el blob (imagen escaneada)
      const imageBlob = await response.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      // Crear PDF con hoja tamaño carta
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter', // también puedes usar 'a4' si prefieres
      });

      // Dimensiones de la página
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Agregar imagen que cubra toda la página
      pdf.addImage(imageURL, 'JPEG', 0, 0, pageWidth, pageHeight);

      // Generar nombre del archivo
      const title = 'Reporte de Mantenimiento'
      const filename = `${title.replace(/\s+/g, '_')}_${eco}_${fechacons}.pdf`;

      // Guardar PDF
      pdf.save(filename);

      // Liberar recursos
      URL.revokeObjectURL(imageURL);
    } catch (error) {
      console.error(' Error: // Mandar el documento del mantenimiento seleccionado, ', error);
      toast.error(error.message || 'Error con el documento');
    }
  };

  // Pedir el número económico -- Mantenimiento
  const ver = async (economico, id, fechaconstancia, nombre, ingresponsable) => {
    navigate(`/informativa/mantenimiento/${economico}`, { state: { id, fechaconstancia, nombre, ingresponsable } });
  };

  return (
    <>
      <Paginador tipo='mantenimientos' data={data} excel='si' cantidad={count} eleccion={eleccion} ver={ver} />
    </>
  );
};

export default SelectMantenimientos;