/* COMPONENTE DE ELEMENTO DE PAGINACIÓN -- DISPOSITIVOS */
import ping from '@utils/ping.jsx';
import { FaList, FaCircle } from 'react-icons/fa';
import { HiStatusOnline, HiExternalLink } from 'react-icons/hi';

const TablaDispositivos = ({ user, data, eleccion, listaDispositivos, cantidad, cantidadTotal }) => {
  return (
    <>
      <div className='cajahijo'>
        <table className='tablaData'>
          <thead>
            <tr>
              <th className='thData eject' title='Lista del dispositivo' ><FaList /></th>
              <th className='thData pingi' title='Ping' ><HiStatusOnline /></th>
              <th className='thData pingi' title='Ir' ><HiExternalLink /></th>
              <th className='thData'>Dispositivo</th>
              <th className='thData'>IP</th>
              <th className='thData'>Económico</th>
              <th className='thData'>Canal</th>
              <th className='sunombre thData'>Sucursal</th>
              {user && user.id !== 4 && (
                <th className='thData'>ing.Responsable</th>
              )}
              {user && (user.id === 1 || user.id === 2) && (
                <th className='thData'>ID</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const ipValida = !item.ip.startsWith('Sin') && !item.ip.startsWith('No');
              return (
                <tr key={item.id}>
                  <>
                    <td className='tdData'><FaCircle onClick={() => { eleccion(item.dispositivo, item.id) }} className='select ir' /></td>
                    <td className="tdData">
                      {ipValida && (
                        <FaCircle onClick={() => ping(item.ip)} className="select ir" />
                      )}
                    </td>
                    <td className="tdData">
                      {ipValida && (
                        <a href={`https://${item.ip}`} target="_blank" rel="noreferrer"><FaCircle className="select ir" /></a>
                      )}
                    </td>
                    <td className="tdData long-data">{item.dispositivo}</td>
                    <td className="tdData">{item.ip}</td>
                    <td className="tdData">{item.economico}</td>
                    <td className="tdData long-data">{item.canal}</td>
                    <td className="tdData long-data">{item.sucursal}</td>
                    {user && user.id !== 4 && (
                      <td className="tdData long-data">{item.ingresponsable}</td>
                    )}
                    {user && (user.id === 1 || user.id === 2) && (
                      <td className="tdData">{item.id}</td>
                    )}
                  </>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className='cantidad'>Dispositivos: {cantidad} / {cantidadTotal}</p>
      </div>
      <div className='tablaLista'>
        <table>
          <thead>
            <tr>
              {listaDispositivos.map(item => (
                <th key={item.nombre} className='thLista' onClick={() => { eleccion(item.nombre, 0); }}>{item.nombre}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default TablaDispositivos;