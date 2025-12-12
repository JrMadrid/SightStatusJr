/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '@api/fetchConfig.js';
import usePageTitle from '@hooks/documentTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectUsers = () => {
  usePageTitle("Usuarios");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los usuarios
  useEffect(() => {
    const url = `/api/panel/users`;
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