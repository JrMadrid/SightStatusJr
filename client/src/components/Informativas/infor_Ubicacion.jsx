/* COMPONENTE DE INFORMATIVA -- UBICACIÓN */
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@context/UserContext';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import fetchData from '@api/fetchConfig.js';
import axios from '@api/axiosConfig.js';
import EstadoConexion from '@elementos/EstadoConexion.jsx';
import usePageTitle from '@hooks/documentTitle.js';
import '@css/Infor_Sucursal.css';
import '@css/infor_Ubicacion.css';
import { FaTools, FaRegListAlt, FaRegEdit, FaCheck, FaTimes, FaRegTrashAlt } from 'react-icons/fa';
import logoSoporte from '@imgs/LogoSoporte.png';
import sucursal from '@imgs/sucursal.png';
// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

// Icono personalizado
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

export default function InfoUbicacion() {
  usePageTitle("Pagina Informativa de Ubicación");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [economicoValido, setEconomicoValido] = useState(false);
  const [mapa, setMapa] = useState({});
  const [hay, setHay] = useState(false);
  const [aviso, setAviso] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [editar, setEditar] = useState(null);
  const [imagenUbicacion, setImagenUbicacion] = useState(sucursal);
  const [nombreImagen, setNombreImagen] = useState('');
  const [borrarImagen, setBorrarImagen] = useState(false);
  const [valorTemporal, setValorTemporal] = useState('');
  const { economico } = useParams();
  const nombre = location.state?.nombre || '';
  const ingresponsable = location.state?.ingresponsable || '';

  // Verificar el economico antes de cualquier consulta
  useEffect(() => {
    const verificarEconomico = async () => {
      try {
        const url = `/api/informativa/ubicacion/verificar/${economico}`;
        const datos = await fetchData(url);
        setEconomicoValido(true);
      } catch (error) {
        console.error("Error: // Verificar el economico antes de cualquier consulta, ", error);
        toast.error(error.message || "Error al verificar económico");
        setEconomicoValido(false);
      }
    };
    if (economico) verificarEconomico();
  }, [economico]);


  // Pedir los datos de la ubicación de la sucursal
  useEffect(() => {
    if (!economicoValido) { return; };
    const mapasucursal = async () => {
      try {
        const url = `/api/informativa/ubicacion/datos/${economico}`;
        const datos = await fetchData(url);
        setMapa(datos);
        if (datos.latitud == null || datos.longitud == null) {
          setAviso("Falta definir la ubicación");
          throw new Error('Falta definir la ubicación');
        }
        setHay(true);
      } catch (error) {
        console.error('Error: // Mandar los datos de la ubicación de la sucursal, ', error);
        toast.dismiss();
        toast.error(error.message || 'Error con los datos de la ubicación');
      }
    };
    mapasucursal();
  }, [economico, economicoValido]);

  // Pedir la imagen de la ubicación de la sucursal
  useEffect(() => {
    if (!economicoValido) { return; };
    const PedirImagenUbicacion = async () => {
      try {
        const url = `/api/informativa/ubicacion/imagen/${economico}`;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lo sentimos, ocurrió un problema");
        }
        const imageBlob = await response.blob();
        if (imageBlob.size === 0) throw new Error("La respuesta no entrega una imagen");
        if (!imageBlob.type.startsWith("image/"))
          throw new Error("La respuesta no es una imagen válida");
        const imageUrl = window.URL.createObjectURL(imageBlob);
        setImagenUbicacion((prev) => {
          if (prev) window.URL.revokeObjectURL(prev); // liberar URL anterior
          return imageUrl;
        });
      } catch (error) {
        console.error('Error: // Pedir la imagen de la ubicación de la sucursal, ', error);
        toast.dismiss();
        toast.error(error.message || "Error con la imagen de la ubicación");
      }
    };
    PedirImagenUbicacion();
  }, [economico, economicoValido]);

  // Editar
  const ediccion = (campo) => {
    setEditar(campo);
    setValorTemporal(mapa?.[campo] || '');
    if (campo !== 'imagen') {
      setBorrarImagen(false);
      setNombreImagen('');
    }
  };

  // Cancelar el editar
  const cancelarEdicion = () => {
    setEditar(null);
    setValorTemporal('');
    setBorrarImagen(false);
    setNombreImagen('');
  };

  // Editar los datos de la ubicación
  const guardarCambio = async () => {
    if (!editar) return;
    let campo = editar;
    let valor = valorTemporal;
    setEditar(null);
    if (campo === 'imagen') {
      if (!borrarImagen) {
        await subirImagen(valorTemporal); // función separada solo para la imagen
        return;
      } else {
        campo = 'BorrarImagen';
        valor = borrarImagen;
      }
    } else {
      if (typeof valor === 'string') {
        valor = valor.trim();
      }
      setBorrarImagen(false);
    }
    const url = `/api/informativa/ubicacion/editar/datos`;
    try {
      const payload = { propiedadEditar: campo, valor, economico };
      const response = await axios.put(url, payload);
      setMapa({ ...mapa, [campo]: valorTemporal });
      toast.success(response?.data?.message || 'Cambio guardado');
      if (campo === 'BorrarImagen') { setImagenUbicacion(sucursal); }
    } catch (error) {
      console.error('Error: // Editar los datos de la ubicación, ', error);
      toast.error(error.response?.data?.message || "Error al editar la ubicación");
      setErrorInput(error.response?.data?.message);
    } finally {
      setNombreImagen('');
    }
  };

  // Editar la imagen de la ubicación
  const subirImagen = async (archivo) => {
    if (!archivo) {
      toast.error("Ningún archivo seleccionado.");
      return;
    }
    const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/avif"];
    const maxSizeMB = 5;

    if (!tiposPermitidos.includes(archivo.type)) {
      toast.error("Solo se permiten imágenes PNG o JPG.");
      return;
    }
    if (archivo.size > maxSizeMB * 1024 * 1024) {
      toast.error(`La imagen no debe pesar más de ${maxSizeMB}MB.`);
      return;
    }
    const formData = new FormData();
    formData.append("imagen", archivo);
    formData.append("economico", economico);
    try {
      const url = `/api/informativa/ubicacion/editar/imagen`;
      await axios.put(url,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } });
      // Actualizar solo la imagen mostrada
      setImagenUbicacion(URL.createObjectURL(archivo));
      toast.success("Imagen actualizada correctamente");
    } catch (error) {
      console.error('Error: // Editar la imagen de la ubicación, ', error);
      toast.error(error.response?.data?.message || "Error al subir la imagen");
    } finally {
      setNombreImagen('');
    }
  };

  // Mostrar el elemento con los datos
  const renderCampo = (campo, label) => {
    if (!economicoValido) { return; };
    const valorActual = mapa?.[campo];
    let contenido = valorActual;

    if (campo === 'actualizado' && valorActual) {
      const fecha = new Date(valorActual);
      contenido = fecha.toLocaleString();
    } else if ((campo === 'latitud' || campo === 'longitud') && valorActual !== null && valorActual !== undefined) {
      contenido = parseFloat(valorActual).toFixed(8);
    }
    return (
      <>
        {campo === 'direccion' && (
          <>
            <span className='direccion'>
              {(user.id === 1 || user.id === 2) && (
                <FaRegEdit className='editIcon' onClick={() => ediccion(campo)} style={{ paddingRight: '0.2rem' }} />
              )}
            </span>
            {(editar === campo && (user.id === 1 || user.id === 2)) ? (
              <>
                <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={guardarCambio} className='btnConfirmar'><FaCheck /></button>
                  <button onClick={cancelarEdicion} className='btnCancelar'><FaTimes /></button>
                </span>
                {renderInput(campo)}
              </>
            ) : (
              <span>{contenido}</span>
            )}
          </>
        )}
        {campo === 'descripcion' && (
          <>
            <h5 className='datosUbicaciondesc '>
              <span className='datosTipo '>
                {(user.id === 1 || user.id === 2) && (
                  <FaRegEdit className='editIcon' onClick={() => ediccion(campo)} />
                )}
                {` ${label + ':'} `}
              </span>
              {(editar === campo && (user.id === 1 || user.id === 2)) ? (
                <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {renderInput(campo)}
                  <button onClick={guardarCambio} className='btnConfirmar'><FaCheck /></button>
                  <button onClick={cancelarEdicion} className='btnCancelar'><FaTimes /></button>
                </span>
              ) : (
                <span>{contenido || `Sin registrar`}</span>
              )}
            </h5 >
          </>
        )}
        {campo === 'imagen' && (
          <>
            <h5>
              <span style={{ display: 'flex', paddingLeft: '15px' }}>
                {(user.id === 1 || user.id === 2) && (
                  <FaRegEdit className='editIcon' onClick={() => ediccion(campo)} style={{ textAlign: 'left !important' }} />
                )}
              </span>
              {(editar === campo && (user.id === 1 || user.id === 2)) ? (
                <>
                  {renderInput(campo)}
                  <span style={{ gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={guardarCambio} className='btnU btnConfirmar' ><FaCheck /></button>
                    <button onClick={cancelarEdicion} className='btnU btnCancelar' ><FaTimes /></button>
                  </span>
                </>
              ) : (
                <span></span>
              )}
            </h5 >
          </>
        )}
        {(campo !== 'direccion' && campo !== 'descripcion' && campo !== 'imagen') && (
          <>
            <h5 className='datosUbicacion '>
              <span className='datosTipo '>
                {(user.id === 1 || user.id === 2) && (
                  <FaRegEdit className='editIcon' onClick={() => ediccion(campo)} />
                )}
                {campo !== 'imagen' && ` ${label}: `}
              </span>
              {(editar === campo && (user.id === 1 || user.id === 2)) ? (
                <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {renderInput(campo)}
                  <button onClick={guardarCambio} className='btnConfirmar'><FaCheck /></button>
                  <button onClick={cancelarEdicion} className='btnCancelar'><FaTimes /></button>
                </span>
              ) : (
                <>
                  <span>{contenido || `Sin registrar`}</span>
                </>
              )}
            </h5 >
          </>
        )}
      </>
    );
  };

  // Mostrar el elemento para ingresar datos
  const renderInput = (campo) => {
    switch (campo) {
      case 'direccion':
        return (
          <textarea value={valorTemporal || ''} maxLength={255} rows={3} style={{ width: '100%', maxWidth: '100%', minHeight: '33vh', maxHeight: '33vh' }} placeholder="Ej: Calle principal, frente al parque" autoFocus
            onChange={(e) => setValorTemporal(e.target.value.slice(0, 255))} />
        );
      case 'imagen':
        return (
          <>
            <button onClick={() => { setBorrarImagen(true); setNombreImagen('Se eliminará la imagen') }} className='btnU btnEliminar' ><FaRegTrashAlt /></button>
            <label htmlFor="fotoSucursal" className='subirFotoPerfil'>Subir Imagen</label>
            <input id="fotoSucursal" type="file" accept=".jpg,.jpeg,.png,.webp,.avif" onChange={(e) => { setValorTemporal(e.target.files[0] || ''); setNombreImagen(e.target.files[0]?.name || ''); setBorrarImagen(false) }} autoFocus style={{ display: 'none' }} />
          </>
        );
      case 'latitud':
        return (
          <>
            <input type="text" inputMode="decimal" maxLength={12} style={{ width: '75%' }} autoFocus
              placeholder="Debe estar entre -90 y 90, Ej: 15.50420000" title="Debe estar entre -90 y 90, Ej: 15.50420000"
              value={valorTemporal || ''} onChange={(e) => { const m = e.target.value.match(/^-?(?:\d{0,2}(?:\.\d{0,8})?|\.\d{0,8})/); setValorTemporal(m ? m[0] : ''); }} />
          </>
        );
      case 'longitud':
        return (
          <>
            <input
              type="text" inputMode="decimal" maxLength={13} style={{ width: '75%' }} autoFocus
              placeholder="Debe estar entre -180 y 180, Ej: -88.02500000" title="Debe estar entre -180 y 180, Ej: -88.02500000"
              value={valorTemporal || ''} onChange={(e) => { const m = e.target.value.match(/^-?(?:\d{0,3}(?:\.\d{0,8})?|\.\d{0,8})/); setValorTemporal(m ? m[0] : ''); }} />
          </>
        );
      case 'actualizado':
        return (
          <input type="datetime-local" max={new Date().toISOString().slice(0, 16)} value={valorTemporal || ''} onChange={(e) => setValorTemporal(e.target.value)} autoFocus />
        );
      case 'descripcion':
        return (
          <textarea value={valorTemporal || ''} maxLength={3000} rows={3} style={{ width: '90%', maxWidth: '90%', minHeight: '18.5vh', maxHeight: '18.5vh', resize: 'vertical' }} placeholder="Ej: Ventanas grandes de vidrio color verde" autoFocus
            onChange={(e) => setValorTemporal(e.target.value.slice(0, 3000))} />
        );
      default:
        return (
          <input value={valorTemporal || ''} onChange={(e) => setValorTemporal(e.target.value)} autoFocus />
        );
    }
  };

  // Navegación entre páginas informativas
  const sumGo = async (tipo, economico) => {
    navigate(`/informativa/${tipo}/${economico}`, { state: { id: '0', nombre, ingresponsable } });
  };

  // Función interna del mapa que detecta clic y muestra las coordenadas
  function ClickUbicacion() {
    useMapEvent('click', (e) => {
      toast.dismiss(); // Cierra cualquier toast previo
      toast(`Latitud: ${e.latlng.lat.toFixed(8)}, Longitud: ${e.latlng.lng.toFixed(8)}`, { duration: 8000, })
    });
    return null;
  }

  return (
    <>
      <EstadoConexion />
      <div className='sidebar'>
        <h3 className='heading'>{ingresponsable}</h3>
        <h3 className='heading'>{nombre}</h3>
        <h3 className='heading'>{economico}</h3>
        <h3 className='principal'>Dirección</h3>
        <div className="desccaja">
          <p className="descman">{renderCampo('direccion', 'Direccion')}</p>
        </div>
        <br />
        <div className='funcionesExtras'>
          <div className='sumCaja'>
            <FaTools title='Mantenimientos' className='sumSeccion' onClick={() => { sumGo('mantenimiento', economico) }} />
            <FaRegListAlt title='Dispositivos de la Sucursal' className='sumSeccion' onClick={() => { sumGo('sucursal', economico) }} />
          </div>
        </div>
        <div className='logodiv'>
          <img src={logoSoporte} className='logo' alt="Logo de Soporte" />
        </div>
      </div >

      {/* Contenido */}
      <div>
        <h2 className='titulo'>Soporte Técnico Honduras</h2>
        <div className='cajaInformacionUbicacion' style={{ height: '45vh' }}>
          {hay && (
            <MapContainer center={[mapa.latitud, mapa.longitud]} zoom={25} style={{ height: '100%', width: "60%", borderRadius: '6px' }} fullscreenControl={true} >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />
              <Marker position={[mapa.latitud, mapa.longitud]} icon={customIcon}>
                <Popup><strong>{nombre}</strong><br />{mapa.direccion}</Popup>
              </Marker>
              <ClickUbicacion />
            </MapContainer>
          )}
          {!hay && (
            <div style={{ height: '100%', width: "60%", borderRadius: '6px' }} >
              <h5>{aviso}</h5>
            </div>
          )}
          <div className='contenedorImagen'>
            {renderCampo('imagen', 'Imagen')}
            {nombreImagen && <p style={{ padding: '0.2rem', textAlign: 'center' }}>{nombreImagen}</p>}
            <div className='fotoSucursal'>
              {imagenUbicacion && (
                <img src={imagenUbicacion} className='sucursalFoto' alt="Foto de Sucursal" />
              )}
            </div>
          </div>
        </div>
        <div className='cajaEditarMapa'>
          <div className='editarMapa'>
            {renderCampo('latitud', 'Latitud')}
            {renderCampo('longitud', 'Longitud')}
            {renderCampo('actualizado', 'Actualizado')}
          </div>
          <div className='editarMapadesc' style={{ height: `${user.id === 1 || user.id === 2 ? '70%' : '80%'}` }}>
            {renderCampo('descripcion', 'Descripción')}
          </div>
          {(user.id === 1 || user.id === 2) && (
            <div className='editarMapaError' >
              <small>{errorInput}</small>
            </div>
          )}
        </div>
      </div>
      <Toaster toastOptions={{ className: 'noti' }} />
    </>
  );
};