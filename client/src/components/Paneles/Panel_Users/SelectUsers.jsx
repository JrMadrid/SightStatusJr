/* PANEL DE ADMINISTRACIÓN DE USUARIOS -- VISUALIZAR */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCrudApi from '@hooks/useCrudApi';
import usePageTitle from '@hooks/usePageTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from 'react-hot-toast';

const SelectUsers = () => {
  usePageTitle('Usuarios');
  const navigate = useNavigate();
  const { read: readUsers, message } = useCrudApi('/api/panel/users');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los usuarios
  useEffect(() => {
    const usuarios = async () => {
      try {
        const datos = await readUsers();
        setData(datos);
        setCount(datos.length);
      } catch (err) {
        console.error('Error: // Pedir los datos de los usuarios', err);
        toast.error(message || 'Error al cargar los usuarios');
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