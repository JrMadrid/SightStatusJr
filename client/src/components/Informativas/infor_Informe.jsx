/* COMPONENTE DE INFORMATIVA -- INFORME */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import fetchData from '../../api/fetchConfig.js';
import logoSoporte from '../../imgs/LogoSoporte.png';
import '../css/Infor_Sucursal.css';

export default function InfoInforme() {
  const location = useLocation();
  const [informeInfo, setInformeInfo] = useState({});
  const [informeBlob, setInformeBlob] = useState(null);

  const id = location.state?.id;
  
  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Pagina Informativa de Informe";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Mandar los datos del informe
  useEffect(() => {
    const informeInfo = async () => {
      try {
        const url = `http://${process.env.REACT_APP_HOST}/informe/informes/info/${id}`;
        const response = await fetchData(url);
        if (!response.ok) { throw new Error(response.message || 'Lo sentimos, ocurrió un problema'); }
        const manualinfo = await response.json();
        setInformeInfo(manualinfo[0]);
      } catch (error) {
        console.error('Error: // Mandar los datos del informe, ', error);
        toast.error(error.message || 'Error con los datos');
      }
    };

    informeInfo();
  }, [id]);

  // Mandar el informe
  useEffect(() => {
    const informeDoc = async () => {
      try {
        const url = `http://${process.env.REACT_APP_HOST}/informe/informes/informe/${id}`;
        const response = await fetchData(url);
        if (!response) throw new Error('Sin documento');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Lo sentimos, ocurrió un problema');
        }

        const manualBlob = await response.blob();
        if (manualBlob.size === 0) {
          setInformeBlob(null);
          throw new Error('La respuesta no entrega un documento');
        }
        setInformeBlob(manualBlob);
        if (!manualBlob.type.startsWith('application/pdf')) {
          throw new Error('La respuesta no es un documento PDF válido');
        }
      } catch (error) {
        console.error('Error: // Mandar el informe, ', error);
        toast.error(error.message || 'Error con los datos');
      }
    };

    informeDoc();
  }, [id]);

  return (
    <>
      <div className="sidebar">
        <h3 className="heading nombrelargo" style={{ maxHeight: "none" }}>{informeInfo.nombre}</h3>
        <div className="desccaja">
          <p className="descman">{informeInfo.descripcion}</p>
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
          {informeBlob ? (
            <iframe
              src={URL.createObjectURL(informeBlob)}
              title="PDF Viewer"
              style={{
                display: "block", width: "100%", height: "100%", border: "none",
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