/* COMPONENTE DE INFORMATIVA -- INFORME */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import fetchData from '@api/fetchConfig.js';
import usePageTitle from '@hooks/usePageTitle.js';
import logoSoporte from '@imgs/LogoSoporte.png';
import '@css/Infor_Sucursal.css';

export default function InfoInforme() {
  usePageTitle("Pagina Informativa de Informe");
  const location = useLocation();
  const [informeInfo, setInformeInfo] = useState({});
  const [informeBlob, setInformeBlob] = useState(null);
  const id = location.state?.id;

  // Mandar los datos del informe
  useEffect(() => {
    const informeInfo = async () => {
      try {
        const url = `/api/informativa/informes/info/${id}`;
        const datos = await fetchData(url);
        setInformeInfo(datos[0]);
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
        const url = `/api/informativa/informes/informe/${id}`;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
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
    </>
  );
};