/* TABLA DE DISPOSITIVOS Y PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- VISUALIZAR */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from '@api/fetchConfig.js';
import usePageTitle from '@hooks/documentTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from "react-hot-toast";

const SelectDispositivos = () => {
  usePageTitle("Dispositivos");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dispolist, setDispolist] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los dispositivo
  useEffect(() => {
    const url = `/api/panel/dispositivos`;
    const dispositivos = async () => {
      try {
        const datos = await fetchData(url);
        setCount(datos.length)
        setData(datos);
      } catch (error) {
        console.error('Error: // Pedir los datos de los dispositivos , ', error);
        toast.error(error.message || 'Error al cargar los dispositivos');
      }
    };

    dispositivos();
  }, []);

  // Pedir la lista de los dispositivos
  useEffect(() => {
    const url = `/api/panel/dispositivos/lista`;
    const dispositivoslista = async () => {
      try {
        const lista = await fetchData(url);
        setDispolist(lista);
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