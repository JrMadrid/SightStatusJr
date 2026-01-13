/* COMPONENTE DE ELEMENTO DE PAGINACIÓN -- SUCURSALES */
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCircle, FaRegListAlt, FaTools } from 'react-icons/fa';

const TablaSucursales = ({ user, data, eleccion, eleccionUbica, eleccionMante, cantidad, cantidadTotal }) => {
  return (
    <div className='cajahijo'>
      <table className='tablaData'>
        <thead>
          <tr>
            <th className='thData eject' title='Dispositivos de la sucursal' ><FaRegListAlt /></th>
            <th className='thData eject' title='Ubicación de la sucursal' ><FaMapLocationDot /></th>
            <th className='thData eject' title='Mantenimientos de la sucursal' ><FaTools /></th>
            <th className='thData'>Económico</th>
            <th className='thData'>Canal</th>
            <th className='sunombre thData'>Nombre</th>
            {user && user.id !== 4 && (
              <th className='thData'>Ing.Responsable</th>
            )}
            {user && (user.id === 1 || user.id === 2) && (
              <th className='thData'>ID</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => !item.economico.startsWith('000001'))
            .map(item => (
              <tr key={item.economico}>
                <td className='tdData'><FaCircle onClick={() => { eleccion(item.economico, item.nombre, item.ingresponsable) }} className='select ir' /></td>
                <td className='tdData'><FaCircle onClick={() => { eleccionUbica(item.economico, item.nombre, item.ingresponsable) }} className='select ir' /></td>
                <td className='tdData'><FaCircle onClick={() => { eleccionMante(item.economico, item.ingresponsable) }} className='select ir' /></td>
                <td className='tdData'>{item.economico}</td>
                <td className='tdData long-data'>{item.canal}</td>
                <td className='tdData long-data'>{item.nombre}</td>
                {user && user.id !== 4 && (
                  <td className='tdData long-data'>{item.ingresponsable}</td>
                )}
                {user && (user.id === 1 || user.id === 2) && (
                  <td className='tdData'>{item.id}</td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <p className='cantidad'>Sucursales: {cantidad} / {cantidadTotal}</p>
    </div>
  );
};

export default TablaSucursales;