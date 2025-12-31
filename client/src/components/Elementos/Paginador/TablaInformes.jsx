/* COMPONENTE DE ELEMENTO DE PAGINACIÓN -- INFORMES */
import { FormatearFechaTabla } from '@elementos/Date.jsx';
import { FaCircle, FaFileDownload, FaFileAlt } from "react-icons/fa";

const TablaInformes = ({ user, data, eleccion, ver, cantidad, cantidadTotal }) => {
  return (
    <div className='cajahijo'>
      <table className='tablaData'>
        <thead>
          <tr>
            <th className='thData eject' title='Descarga directa' ><FaFileDownload /></th>
            <th className='thData eject' title='Visualizar' ><FaFileAlt /></th>
            <th className='thData'>Económico</th>
            <th className='thData'>Canal</th>
            <th className='thData'>Sucursal</th>
            <th className='thData'>Fecha Realizado</th>
            <th className='thData'>Nombre</th>
            {user && (user.id === 1 || user.id === 2) && (
              <>
                <th className='thData'>Ing.Responsable</th>
                <th className='thData'>ID</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className='tdData'><FaCircle onClick={() => { eleccion(item.id, item.nombre) }} className='select ir' /></td>
              <td className='tdData'><FaCircle onClick={() => { ver(item.id) }} className='select ir' /></td>
              <td className='tdData'>{item.economico}</td>
              <td className='tdData long-data'>{item.canal}</td>
              <td className='tdData long-data'>{item.sucursal}</td>
              <td className='tdData'><FormatearFechaTabla fecha={item.fecharealizada} /></td>
              <td className='tdData long-data' style={{ maxWidth: '30vw' }}>{item.nombre}</td>
              {user && (user.id === 1 || user.id === 2) && (
                <>
                  <td className='tdData long-data'>{item.ingresponsable}</td>
                  <td className='tdData'>{item.id}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p className='cantidad'>Informes: {cantidad} / {cantidadTotal}</p>
    </div>
  );
};

export default TablaInformes;