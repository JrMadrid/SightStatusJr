/* TABLA DE SUCURSALES Y PANEL DE ADMINISTRACIÓN DE SUCURSALES -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import fetchData from '../../api/fetchConfig.js';
import { Paginador } from '../Elements/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectSucursales = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Sucursales";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Pedir los datos de las sucursales
  useEffect(() => {
    const url = `/panel/sucursales`;
    const sucursales = async () => {
      try {
        const datos = await fetchData(url);
        setData(datos);
        setCount(datos.length);
      } catch (error) {
        console.error('Error // Pedir los datos de las sucursales, ', error);
        toast.error(error.message || 'Error al cargar las sucursales');
      }
    };

    sucursales();
  }, []);

  // Pedir el número economico
  const eleccion = async (economico, nombre, ingresponsable) => {
    navigate(`/informativa/sucursal/${economico}`, { state: { nombre, ingresponsable } });
  };

  // Pedir el número economico
  const eleccionUbica = async (economico, nombre, ingresponsable) => {
    navigate(`/informativa/ubicacion/${economico}`, { state: { nombre, ingresponsable } });
  };

  // Pedir el número económico -- Mantenimiento
  const eleccionMante = async (economico, ingresponsable) => {
    navigate(`/informativa/mantenimiento/${economico}`, { state: { id: '0', ingresponsable } });
  };

  return (
    <>
      <Paginador tipo='sucursales' data={data} eleccion={eleccion} eleccionUbica={eleccionUbica} eleccionMante={eleccionMante} excel='si' cantidad={count} />
    </>
  );
};

export default SelectSucursales;