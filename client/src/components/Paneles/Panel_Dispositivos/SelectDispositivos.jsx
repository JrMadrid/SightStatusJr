/* TABLA DE DISPOSITIVOS Y PANEL DE ADMINISTRACIÓN DE DISPOSITIVOS -- VISUALIZAR */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCrudApi from '@hooks/useCrudApi';
import usePageTitle from '@hooks/usePageTitle.js';
import { Paginador } from '@elementos/Paginador.jsx';
import toast from "react-hot-toast";

const SelectDispositivos = () => {
  usePageTitle("Dispositivos");
  const navigate = useNavigate();
  const { read: readDispositivos, message: messageTabla } = useCrudApi('/api/panel/dispositivos');
  const { read: readDispositivosLista, message: messageLista } = useCrudApi('/api/panel/dispositivos/lista');
  const [data, setData] = useState([]);
  const [dispolist, setDispolist] = useState([]);
  const [count, setCount] = useState(0);

  // Pedir los datos de los dispositivo
  useEffect(() => {
    const dispositivos = async () => {
      try {
        const datos = await readDispositivos();
        setCount(datos.length)
        setData(datos);
      } catch (error) {
        console.error('Error: // Pedir los datos de los dispositivos , ', error);
        toast.error(messageTabla || 'Error al cargar los dispositivos');
      }
    };

    dispositivos();
  }, []);

  // Pedir la lista de los dispositivos
  useEffect(() => {
    const dispositivoslista = async () => {
      try {
        const lista = await readDispositivosLista();
        setDispolist(lista);
      } catch (error) {
        console.error('Error: // Pedir la lista de los dispositivos, ', error);
        toast.error(messageLista || 'Error al cargar los dispositivos');
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