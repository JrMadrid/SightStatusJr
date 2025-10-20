/* COMPONENTE DE ELEMENTO DE PAGINACIÓN -- MANTENIMIENTOS */
import { FormatearFechaTabla } from '../date.jsx';
import { FaCircle, FaFileDownload, FaTools } from "react-icons/fa";

const TablaMantenimientos = ({ user, data, eleccion, ver, cantidad, cantidadTotal }) => {
  return (
    <div className='cajahijo'>
      <table className='tablaData'>
        <thead>
          <tr>
            <th className='thData eject' title='Descarga directa' ><FaFileDownload /></th>
            <th className='thData eject' title='Mantenimiento' ><FaTools /></th>
            <th className='thData'>Económico</th>
            {user && user.id !== 4 && (
              <th className='thData'>Ing. Responsable</th>
            )}
            <th className='thData'>Fecha Estimada</th>
            <th className='thData'>Fecha Realizado</th>
            <th className='thData'>Descripción</th>
            <th className='thData'>ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            !item.economico.startsWith('000000') && (
              <tr key={item.id}>
                <td className='tdData'>
                  {(item.frealizada && item.frealizada !== null && item.frealizada !== 'null' && item.frealizada !== 'Pendiente') && (
                    <FaCircle onClick={() => { eleccion(item.id, item.economico, item.frealizada) }} className='select ir' />
                  )}
                </td>
                <td className='tdData'>
                  {(item.frealizada && item.frealizada !== null && item.frealizada !== 'null' && item.frealizada !== 'Pendiente') && (
                    <FaCircle onClick={() => { ver(item.economico, item.id, item.frealizada, item.ingresponsable) }} className='select ir' />
                  )}
                </td>
                <td className='tdData'>{item.economico}</td>
                {user && user.id !== 4 && (
                  <td className='tdData long-data'>{item.ingresponsable}</td>
                )}
                <td className='tdData'><FormatearFechaTabla fecha={item.festimada} /></td>
                <td className='tdData'>
                  {(item.frealizada && item.frealizada !== null && item.frealizada !== 'null' && item.frealizada !== 'Pendiente') && (
                    <FormatearFechaTabla fecha={item.frealizada} />
                  )}
                  {(!item.frealizada || item.frealizada === null || item.frealizada === 'null' || item.frealizada === 'Pendiente') && (
                    <span>Pendiente</span>
                  )}
                </td>
                <td className='tdData long-data'>{item.descripcion}</td>
                <td className='tdData'>{item.id}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      <p className='cantidad'>Mantenimientos: {cantidad} / {cantidadTotal}</p>
    </div>
  );
};

export default TablaMantenimientos;