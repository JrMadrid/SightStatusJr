/* CONTEXT DE USUARIO */
import { createContext, useState, useEffect } from 'react'; // createContext: crea un contexto para compartir datos entre componentes funciona como un store global
import fetchData from '../api/fetchConfig';

// Crea el context
export const UserContext = createContext();

// Pedimos el tipo de usuario, si se ha definido o no entre administrador y visita 
export const UserProvider = ({ children }) => { // children es el componente que envuelve al provider
  const [user, setUser] = useState(null);

  // Definir el tipo de usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tipo = await fetchData(`/auth/api/user`);   
        setUser(tipo);
      } catch (error) {
        console.error('Error: // Definir el tipo de usuario, ', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}> {/* </-- Provee el valor del contexto --> */}
      {children} {/* </-- Renderiza los hijos del provider --> */}
    </UserContext.Provider>
  );
};