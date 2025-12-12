/* COMPONENTE DE ELEMENTO DE PAGINACIÓN -- MANUALES */
import { FaCircle, FaFileDownload, FaBook } from "react-icons/fa";

const TablaManuales = ({ data, eleccion, ver, cantidad, cantidadTotal }) => {
  return (
    <div className='cajahijo'>
      <table className='tablaData'>
        <thead>
          <tr>
            <th className='thData eject' title='Descarga directa' ><FaFileDownload /></th>
            <th className='thData eject' title='Visualizar' ><FaBook /></th>
            <th className='thData'>Nombre</th>
            <th className='thData'>Descripción</th>
            <th className='thData'>ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className='tdData'><FaCircle onClick={() => { eleccion(item.id, item.nombre) }} className='select ir' /></td>
              <td className='tdData'><FaCircle onClick={() => { ver(item.id) }} className='select ir' /></td>
              <td className='tdData long-data' style={{ maxWidth: '30vw' }}>{item.nombre}</td>
              <td className='tdData long-data' style={{ maxWidth: '30vw' }}>{item.descripcion}</td>
              <td className='tdData'>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='cantidad'>Manuales: {cantidad} / {cantidadTotal}</p>
    </div>
  );
};

export default TablaManuales;