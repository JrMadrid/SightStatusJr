/* TABLA DE DISPOSITIVOS Y PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- VISUALIZAR */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from '../../api/fetchConfig.js';
import { Paginador } from '../Elements/Paginador.jsx';
import toast from "react-hot-toast";

const SelectDispositivos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dispolist, setDispolist] = useState([]);
  const [count, setCount] = useState(0);

  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Dispositivos";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Pedir los datos de los dispositivo
  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST}/panel/dispositivos`;
    const dispositivos = async () => {
      try {
        const response = await fetchData(url);
        const dispositivos = await response.json();
        if (!response.ok) {
          throw new Error(dispositivos.message || 'Lo sentimos, ocurrió un problema');
        }

        setCount(dispositivos.length)
        setData(dispositivos);
      } catch (error) {
        console.error('Error: // Pedir los datos de los dispositivos , ', error);
        toast.error(error.message || 'Error al cargar los dispositivos');
      }
    };

    dispositivos();
  }, []);

  // Pedir la lista de los dispositivos
  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST}/panel/dispositivos/lista`;
    const dispositivoslista = async () => {
      try {
        const response = await fetchData(url);
        const listadispositivos = await response.json();
        if (!response.ok) {
          throw new Error(listadispositivos.message || 'Lo sentimos, ocurrió un problema');
        }

        setDispolist(listadispositivos);
      } catch (error) {
        console.error('Error: // Pedir la lista de los dispositivos, ', error);
        toast.error(error.message || 'Error al cargar los dispositivos');
      }
    };

    dispositivoslista();
  }, []);

  // Recibir el nombre del dispositivo
  const eleccion = async (nombre, id) => {
    navigate(`/informativa/dispositivo/${nombre}`);
    localStorage.setItem('idDispositivo', id); // guarda el ID
  };

  return (
    <>
      <Paginador tipo='dispositivos' data={data} eleccion={eleccion} excel='si' cantidad={count} listaDispositivos={dispolist} />
    </>
  )
};

export default SelectDispositivos;