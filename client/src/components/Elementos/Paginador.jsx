/* COMPONENTE DE ELEMENTO DE PAGINACIÓN */
import { useState, useEffect, useContext } from 'react';
import TablaUsuarios from './Paginador/TablaUsuarios.jsx';
import TablaSucursales from './Paginador/TablaSucursales.jsx';
import TablaDispositivos from './Paginador/TablaDispositivos.jsx';
import TablaMantenimientos from './Paginador/TablaMantenimientos.jsx';
import TablaManuales from './Paginador/TablaManuales.jsx';
import TablaInformes from './Paginador/TablaInformes.jsx';
import { FormatearFecha, FormatearFechaBusqueda } from '@elementos/Date.jsx';
import { ListExcel } from '@listas/Lista_Excel.jsx';
import { ListPDF } from '@listas/Lista_PDF.jsx';
import { UserContext } from '@context/UserContext';
import ReactPaginate from 'react-paginate';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import logo from '@imgs/LogoSoporte.png';
import hn from '@imgs/hn.png';
import '@css/tabla.css';

/* Buscador y Paginador */
const Paginador = (props) => {
  const user = useContext(UserContext);
  const [titulo, setTitulo] = useState('');
  const [buscador, setBuscador] = useState('');
  const [PaginaActual, setPaginaActual] = useState(0);
  const [Busqueda, setBusqueda] = useState('');
  const [save, setSave] = useState('');
  const itemsPorPagina = 10;

  const busquedaCambios = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(0);
  };

  // Textos de la tabla
  useEffect(() => {
    if (!user) return; // Evita que se ejecute si user aún no está cargado

    if (props.tipo === 'usuarios') {
      setTitulo('USUARIOS');
      setBuscador('Buscar por Nombre o Usuario');
      setSave('Usuarios');
    }
    else if (props.tipo === 'sucursales') {
      setTitulo('SUCURSALES');
      setBuscador(user.id === 4 ? 'Buscar por Número económico, Canal o Nombre' : 'Buscar por Número económico, Canal,  Nombre o ing.Responsable');
      setSave('Sucursales');
    }
    else if (props.tipo === 'dispositivos') {
      setTitulo('DISPOSITIVOS');
      setBuscador(user.id === 4 ? 'Buscar por Dispositivo, IP, Económico, Canal, o Sucursal' : 'Buscar por Dispositivo, IP, Económico, Canal, Sucursal o Ing.Responsable');
      setSave('Dispositivos');
    }
    else if (props.tipo === 'mantenimientos') {
      setTitulo('MANTENIMIENTOS');
      setBuscador(user.id === 4 ? 'Buscar por Número económico o Fechas' : 'Buscar por Número económico, ing. Responsable o Fechas');
      setSave('Mantenimientos');
    }
    else if (props.tipo === 'manuales') {
      setTitulo('MANUALES');
      setBuscador('Buscar por Nombre o Descripción');
      setSave('Manuales');
    }
    else if (props.tipo === 'informes') {
      setTitulo('INFORMES');
      setBuscador(user.id === 4 ? 'Buscar por Económico, Canal, Sucursal, Fecha Realizada, Nombre o Descripción' : 'Buscar por Económico, Canal, Sucursal, Fecha Realizada, Nombre, Descripción o Ing. Responsable');
      setSave('Informes');
    }
    
  }, [props.tipo, user]);

  // Función para filtrar los datos según el tipo y la búsqueda
  const filtrarDatos = props.data.filter(item => {
    if (props.tipo === 'usuarios') {
      const nickname = item.nickname ? item.nickname.toString().toLowerCase() : '';
      const tipo = item.tipo ? item.tipo.toString().toLowerCase() : '';
      return (
        nickname.includes(Busqueda.toLowerCase()) || tipo.includes(Busqueda.toLowerCase())
      );
    }
    else if (props.tipo === 'sucursales') {
      const economico = item.economico ? item.economico.toString().toLowerCase() : '';
      const canal = item.canal ? item.canal.toString().toLowerCase() : '';
      const nombre = item.nombre ? item.nombre.toString().toLowerCase() : '';
      const ingresponsable = item.ingresponsable ? item.ingresponsable.toString().toLowerCase() : '';
      return (
        canal.includes(Busqueda.toLowerCase()) || nombre.includes(Busqueda.toLowerCase()) || economico.includes(Busqueda.toLowerCase()) || ingresponsable.includes(Busqueda.toLowerCase())
      );
    }
    else if (props.tipo === 'dispositivos') {
      if (item.ip.startsWith('000.')) {
        item.ip = 'Sin inventario';
      }
      if (item.ip.startsWith('001.')) {
        item.ip = 'No aplica';
      }
      const dispositivo = item.dispositivo ? item.dispositivo.toString().toLowerCase() : '';
      const ip = item.ip ? item.ip.toString().toLowerCase() : '';
      const economico = item.economico ? item.economico.toString().toLowerCase() : '';
      const canal = item.canal ? item.canal.toString().toLowerCase() : '';
      const sucursal = item.sucursal ? item.sucursal.toString().toLowerCase() : '';
      const ingresponsable = item.ingresponsable ? item.ingresponsable.toString().toLowerCase() : '';
      return (
        canal.includes(Busqueda.toLowerCase()) || sucursal.includes(Busqueda.toLowerCase()) || economico.includes(Busqueda.toLowerCase()) || ip.includes(Busqueda.toLowerCase()) || dispositivo.includes(Busqueda.toLowerCase()) || ingresponsable.includes(Busqueda.toLowerCase())
      );
    }
    else if (props.tipo === 'mantenimientos') {
      let festimada = '';
      let frealizada = '';
      if (item.frealizada === null || item.frealizada === 'null') {
        item.frealizada = 'Pendiente';
      }
      else {
        item.frealizada = FormatearFecha(`${item.frealizada}`);
      }
      item.festimada = FormatearFecha(`${item.festimada}`);
      festimada = item.festimada ? FormatearFechaBusqueda(item.festimada).toString().toLowerCase() : '';
      frealizada = item.frealizada ? FormatearFechaBusqueda(item.frealizada).toString().toLowerCase() : '';
      const economico = item.economico ? item.economico.toString().toLowerCase() : '';
      const canal = item.canal ? item.canal.toString().toLowerCase() : '';
      const nombre = item.nombre ? item.nombre.toString().toLowerCase() : '';
      const ingresponsable = item.ingresponsable ? item.ingresponsable.toString().toLowerCase() : '';
      return (
        frealizada.includes(Busqueda) || festimada.includes(Busqueda) || canal.includes(Busqueda.toLowerCase()) || nombre.includes(Busqueda.toLowerCase()) || economico.includes(Busqueda.toLowerCase()) || ingresponsable.includes(Busqueda.toLowerCase())
      );
    }
    else if (props.tipo === 'manuales') {
      const nombre = item.nombre ? item.nombre.toString().toLowerCase() : '';
      const descripcion = item.descripcion ? item.descripcion.toString().toLowerCase() : '';
      return (
        nombre.includes(Busqueda.toLowerCase()) || descripcion.includes(Busqueda.toLowerCase())
      );
    }
    else if (props.tipo === 'informes') {
      const economico = item.economico ? item.economico.toString().toLowerCase() : '';
      const canal = item.canal ? item.canal.toString().toLowerCase() : '';
      const sucursal = item.sucursal ? item.sucursal.toString().toLowerCase() : '';
      const nombre = item.nombre ? item.nombre.toString().toLowerCase() : '';
      const descripcion = item.descripcion ? item.descripcion.toString().toLowerCase() : '';
      const ingresponsable = item.ingresponsable ? item.ingresponsable.toString().toLowerCase() : '';
      let frealizada = item.fecharealizada ? FormatearFechaBusqueda(item.fecharealizada).toString().toLowerCase() : '';
      item.fecharealizada = FormatearFecha(`${item.fecharealizada}`);
      return (
        canal.includes(Busqueda.toLowerCase()) || sucursal.includes(Busqueda.toLowerCase()) || economico.includes(Busqueda.toLowerCase()) || ingresponsable.includes(Busqueda.toLowerCase()) || frealizada.includes(Busqueda) || nombre.includes(Busqueda.toLowerCase()) || descripcion.includes(Busqueda.toLowerCase())
      );
    }
    return false;
  });
  const cantidadPaginas = Math.ceil(filtrarDatos.length / itemsPorPagina);

  const click = (selectedPage) => {
    setPaginaActual(selectedPage.selected);
  };

  const desplazamiento = PaginaActual * itemsPorPagina;

  const itemsActuales = filtrarDatos.slice(desplazamiento, desplazamiento + itemsPorPagina);

  return (
    <>
      <div className='cajapadre'>
        <div className='encabezados'>
          <img className='logos' src={logo} alt="logo de S.O.S." />
          <h3 className='titular'>{titulo}</h3>
          <img className='logos' src={hn} alt="Bandera de Honduras" />
        </div>
        <input className='buscar' type="text" maxLength='50' placeholder={buscador} value={Busqueda} onChange={busquedaCambios} />
        <ReactPaginate
          previousLabel={<FaCaretLeft className='flechas' />}
          nextLabel={<FaCaretRight className='flechas' />}
          breakLabel={'...'}
          pageCount={cantidadPaginas}
          marginPagesDisplayed={6}
          pageRangeDisplayed={3}
          onPageChange={click}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />

        {/* SUPER ADMINISTRADOR - USUARIOS */}
        {user && user.id === 1 && props.tipo === 'usuarios' && (
          <>
            <TablaUsuarios data={itemsActuales} eleccion={props.eleccion} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* TODOS - SUCURSALES */}
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && props.tipo === 'sucursales' && (
          <>
            <TablaSucursales user={user} data={itemsActuales} eleccion={props.eleccion} eleccionUbica={props.eleccionUbica} eleccionMante={props.eleccionMante} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* TODOS - DISPOSITIVOS */}
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && props.tipo === 'dispositivos' && (
          <>
            <TablaDispositivos user={user} data={itemsActuales} eleccion={props.eleccion} listaDispositivos={props.listaDispositivos} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* TODOS - MANTENIMIENTOS */}
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && props.tipo === 'mantenimientos' && (
          <>
            <TablaMantenimientos user={user} data={itemsActuales} eleccion={props.eleccion} ver={props.ver} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* TODOS - MANUALES */}
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && props.tipo === 'manuales' && (
          <>
            <TablaManuales data={itemsActuales} eleccion={props.eleccion} ver={props.ver} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* TODOS - INFORMES */}
        {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && props.tipo === 'informes' && (
          <>
            <TablaInformes user={user} data={itemsActuales} eleccion={props.eleccion} ver={props.ver} cantidad={filtrarDatos.length} cantidadTotal={props.cantidad} />
          </>
        )}

        {/* DESCARGAR LISTAS EN EXCEL */}
        {user && props.excel === 'si' && (
          <>
            <div className='saves'>
              <div className='save'>
                <ListExcel save={save} data={props.data} titulo='Guardar Excel' />
              </div>
              <div className='save'>
                <ListPDF save={save} data={props.data} cantidad={props.cantidad} titulo='Guardar PDF' />
              </div>
            </div>
          </>
        )}
      </div >
    </>
  );
};

export { Paginador };