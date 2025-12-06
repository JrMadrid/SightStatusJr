/* COMPONENTE DE INFORMATIVA -- MANUAL */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import fetchData from '../../api/fetchConfig.js';
import logoSoporte from '../../imgs/LogoSoporte.png';
import '../css/Infor_Sucursal.css';

export default function InfoManual() {
  const location = useLocation();
  const [manualInfo, setManualInfo] = useState({});
  const [manualBlob, setManualBlob] = useState(null);
  const id = location.state?.id;

  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Pagina Informativa de Manual";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Mandar los datos del manual
  useEffect(() => {
    const manualinfo = async () => {
      try {
        const url = `/informe/manuales/info/${id}`;
        const datos = await fetchData(url);
        setManualInfo(datos);
      } catch (error) {
        console.error('Error: // Mandar los datos del manual, ', error);
        toast.error(error.message || 'Error con los datos');
      }
    };

    manualinfo();
  }, [id]);

  // Mandar el manual
  useEffect(() => {
    const manualar = async () => {
      try {
        const url = `/informe/manuales/manual/${id}`;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
        }
        const manualBlob = await response.blob();
        if (manualBlob.size === 0) {
          setManualBlob(null);
          throw new Error('La respuesta no entrega un documento');
        }
        setManualBlob(manualBlob);
        if (!manualBlob.type.startsWith('application/pdf')) {
          throw new Error('La respuesta no es un documento PDF válido');
        }
      } catch (error) {
        console.error('Error: // Mandar el manual, ', error);
        toast.error(error.message || 'Error con el manual');
      }
    };

    manualar();
  }, [id]);

  return (
    <>
      <div className="sidebar">
        <h3 className="heading nombrelargo" style={{ maxHeight: "none" }}>{manualInfo.nombre}</h3>
        <div className="desccaja">
          <p className="descman">{manualInfo.descripcion}</p>
        </div>
        <br />
        <br />
        <div className="logodiv">
          <img src={logoSoporte} className="logo" alt="Logo de Soporte" />
        </div>
      </div>

      {/* Contenido */}
      <div>
        <h2 className="titulo">Soporte Técnico Honduras</h2>
        <div className="contenedorManual" >
          {manualBlob ? (
            <iframe
              src={URL.createObjectURL(manualBlob)}
              title="PDF Viewer"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          ) : (
            <h5>Espere un momento...</h5>
          )}
        </div>
      </div>

      <Toaster toastOptions={{ className: 'noti' }} />
    </>
  );
};