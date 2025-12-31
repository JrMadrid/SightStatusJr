/* LIMPIEZA DE NOTIFICACIONES */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function ToastCleaner() {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss(); // elimina todos los toasts activos al cambiar de ruta
  }, [location.pathname]);

  return null; // no renderiza nada
}

export default ToastCleaner;