/* HOOK PARA CRUD DE API */
import axios from '@api/axiosConfig';
import toast from 'react-hot-toast';

const useControlUsers = () => {

  const ejecutar = async (url, successMsg, reload = false) => {
    try {
      const response = await axios.post(url, {}); // POST aunque el body esté vacío

      if (response.status === 200) {
        toast.success(successMsg);
      }

      if (reload) {
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error: // Acción usuarios (${url}), `, error);
      toast.error(error?.message || 'Error al ejecutar la acción');
    }
  };

  return {
    ejecutar,
  };
};

export default useControlUsers;