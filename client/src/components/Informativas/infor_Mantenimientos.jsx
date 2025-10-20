/* COMPONENTE DE INFORMATIVA -- MANTENIMIENTOS */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import fetchData from '../../api/fetchConfig.js';
import { FormatearFechaTabla } from '../Elements/date.jsx';
import PDFConstancia from '../PDF/ConstanciaPDF.jsx';
import PDFConstancias from '../PDF/ConstanciasPDF.jsx';
import JPGConstancia from '../PDF/ConstanciaJPG.jsx';
import { ListExcel } from '../Listas/Lista_Excel.jsx';
import '../css/Infor_Sucursal.css';
import { FaRegListAlt } from 'react-icons/fa';
import { FaMapLocationDot } from "react-icons/fa6";
import logoSoporte from '../../imgs/LogoSoporte.png';

export default function InfoMante() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appslist, setAppslist] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState(0);
  const [imageBlob, setImageBlob] = useState(null);
  const [consfecha, setConsFecha] = useState('');
  const [eco, setEco] = useState('');
  const [hay, setHay] = useState(false);
  const [aviso, setAviso] = useState('');
  const { economico } = useParams();
  const id = location.state?.id || 0;
  const fechaconstancia = location.state?.fechaconstancia || '';
  const ingresponsable = location.state?.ingresponsable || '';

  // Nombre de la Pestaña
  useEffect(() => {
    // Cambia el nombre de la pestaña
    document.title = "Pagina Informativa de Mantenimientos";

    // Vuelve al título original
    return () => {
      document.title = "StatusAppJR";
    };
  }, []);

  // Mandar las fechas vinculadas al economico
  useEffect(() => {
    // Evita ejecutar si aún no hay un número económico válido    
    if (!economico) return;

    const fechasr = async () => {
      try {
        const url = `http://${process.env.REACT_APP_HOST}/informe/mantes/fechas/${economico}`;
        const response = await fetchData(url);
        const lista = await response.json();
        if (!response.ok) { throw new Error(lista.message || 'Lo sentimos, ocurrió un problema'); }
        if (!lista.length) {
          setAviso('No hay mantenimientos realizados');
          throw new Error("Sin mantenimientos realizados");
        }
        setEco(lista[0].economico);
        setHay(true);
        setAviso('Elegir un mantenimiento realizado');
        setAppslist(lista);
      } catch (error) {
        console.error('Error: // Mandar las fechas vinculadas al economico, ', error);
        toast.error(error.message || 'Error con las fechas');
      }
    };

    fechasr();
  }, [economico]);

  /* Navegacion entre paginas informativas de la sucursal */
  const sumGo = async (tipo, economico) => {
    navigate(`/informativa/${tipo}/${economico}`, { state: { ingresponsable } });
  };

  // Mandar el documento del mantenimiento seleccionado
  useEffect(() => {
    if (id === '0') { return; };
    setIdSeleccionado(id);
    setConsFecha(fechaconstancia);
    const seleccionado = async () => {
      try {
        const imageConstancia = document.getElementById('imageConstancia');
        imageConstancia.innerHTML = '';
        let url = `http://${process.env.REACT_APP_HOST}/informe/mantes/tabla/seleccionado/${id}`;
        const response = await fetchData(url);
        if (!response) throw new Error('Sin constancia');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Lo sentimos, ocurrió un problema');
        }
        const imageBlob = await response.blob();
        if (imageBlob.size === 0) {
          setImageBlob(null);
          imageConstancia.innerHTML = '<h5>Sin constancia<h5/>';
          throw new Error('La respuesta no entrega una imagen');
        }
        setImageBlob(imageBlob);
        if (!imageBlob.type.startsWith('image/')) {
          throw new Error('La respuesta no es una imagen válida');
        }

        const imageUrl = window.URL.createObjectURL(imageBlob);
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagen asociada al mantenimiento';
        img.style.maxWidth = '100%';

        if (imageConstancia) {
          imageConstancia.appendChild(img);
        } else {
          console.error('Contenedor de imagen no encontrado');
        }
      } catch (error) {
        console.error(' Error: // Mandar el documento del mantenimiento seleccionado, ', error);
        toast.error(error.message || 'Error con el documento');
      }
    }
    seleccionado();
  }, [id, fechaconstancia]);

  // Mandar el archivo de la constancia de la fecha seleccionada
  const archivoSel = async (fechasr) => {
    if (fechasr && fechasr !== null && fechasr !== 'null') {
      try {
        const imageConstancia = document.getElementById('imageConstancia');
        imageConstancia.innerHTML = '';
        const url = `http://${process.env.REACT_APP_HOST}/informe/mantes/informativa/${fechasr}`;
        const response = await fetchData(url);
        if (!response) throw new Error('Sin constancia');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Lo sentimos, ocurrió un problema');
        }

        const imageBlob = await response.blob();

        if (imageBlob.size === 0) {
          setImageBlob(null);
          setConsFecha('');
          imageConstancia.innerHTML = '<h5>Sin constancia<h5/>';
          throw new Error('La respuesta no entrega una imagen');
        }
        setConsFecha(fechasr);
        setImageBlob(imageBlob);
        if (!imageBlob.type.startsWith('image/')) {
          throw new Error('La respuesta no es una imagen válida');
        }

        const imageUrl = window.URL.createObjectURL(imageBlob);

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagen asociada al mantenimiento';
        img.style.maxWidth = '100%';

        if (imageConstancia) {
          imageConstancia.appendChild(img);
        } else {
          console.error('Contenedor de imagen no encontrado');
        }
      } catch (error) {
        console.error('Error: // Mandar el archivo de la constancia de la fecha seleccionada, ', error);
        toast.error(error.message || 'Error con la constancia');
      }
    }
    else {
      toast.error('Fecha no valida');
    }
  };

  return (
    <>
      <div className='sidebar'>
        <h3 className='heading'>{ingresponsable}</h3>
        <h3 className='heading'>{economico}</h3>
        <h3 className='principal'>Mantenimientos Realizados</h3>
        <ul className='list' style={{ minHeight: '42vh', maxHeight: '42vh' }}>
          {appslist.map((fecha, index) => (
            <>
              {(fecha.realizado && fecha.realizado !== null && fecha.realizado !== 'null') && (
                <>
                  <li key={index} className='listItem'>
                    <div className={fecha.id !== idSeleccionado ? 'ListItemA' : 'seleccionado'} style={{ minWidth: '12vw', maxWidth: '12vw' }} onClick={(e) => { e.preventDefault(); setIdSeleccionado(fecha.id); archivoSel(`${fecha.realizado}`); }}>
                      <a href={`#${index}`} className={fecha.id !== idSeleccionado ? 'appi' : 'appiSeleccionado'}><FormatearFechaTabla fecha={fecha.realizado} /></a>
                    </div>
                  </li>
                </>
              )}
            </>
          ))}
        </ul>
        <br />
        <div className='funcionesExtras'>
          <div className='sumCaja'>
            <FaMapLocationDot title='Ubicación' className='sumSeccion' onClick={() => { sumGo('ubicacion', economico) }} />
            <FaRegListAlt title='Dispositivos de la Sucursal' className='sumSeccion' onClick={() => { sumGo('sucursal', economico) }} />
          </div>
          {hay === true && (
            <>
              <button className="pdfAll pdf" onClick={() => PDFConstancias(economico)}>Descargar constancias</button>
              <ListExcel data={appslist} tipo="inforMante" titulo='Lista Excel' />
            </>
          )}
        </div>
        <div className='logodiv'>
          <img src={logoSoporte} className='logo' alt="Logo de Soporte" />
        </div>
      </div >

      {/* Contenido */}
      {imageBlob &&
        <>
          <JPGConstancia imageBlob={imageBlob} fechaco={consfecha} eco={eco} />
          <PDFConstancia imageBlob={imageBlob} fechaco={consfecha} eco={eco} title="Reporte de Mantenimiento" />
        </>
      }
      <div>
        <h2 className='titulo'>Soporte Técnico Honduras</h2>
        <div className='contenedorConstancia'>
          <div className='imageConstancia' id="imageConstancia">
            <h5>{aviso}</h5>
          </div>
        </div>
      </div>
      <Toaster toastOptions={{ className: 'noti' }} />
    </>
  );
};