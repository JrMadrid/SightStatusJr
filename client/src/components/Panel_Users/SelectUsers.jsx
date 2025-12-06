/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../api/fetchConfig.js';
import { Paginador } from '../Elements/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectUsers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Usuarios";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Pedir los datos de los usuarios
  useEffect(() => {
    const url = `/panel/users`;
    const usuarios = async () => {
      try {
        const datos = await fetchData(url);
        setData(datos);
        setCount(datos.length);
      } catch (error) {
        console.error('Error: // Pedir los datos de los usuarios, ', error);
        toast.error(error.message || 'Error con los datos');
      }
    };

    usuarios();
  }, []);

  // Pedir el nombre del usuario
  const eleccion = async (nickname) => {
    navigate(`/informativa/usuario`, { state: { nickname } });
  };

  return (
    <>
      <Paginador tipo='usuarios' data={data} eleccion={eleccion} cantidad={count} />
    </>
  );
};

export default SelectUsers; 