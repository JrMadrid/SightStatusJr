/* PAGINA DE INFORMATIVA -- UBICACION */
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import InfoUbicacion from '../../components/Informativas/infor_Ubicacion.jsx';

const UbicacionInfo = () => {
  const user = useContext(UserContext);

  return (
    <>
      {user && (user.id === 1 || user.id === 2 || user.id === 3 || user.id === 4) && ( // TODOS
        <div>
          <InfoUbicacion />
        </div>
      )}
    </>
  );
};

export default UbicacionInfo;