/* AVISO DE CONEXIÓN A INTERNET */
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function EstadoConexion() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      toast.dismiss(); // Cierra cualquier toast previo
      toast.success('Conexión restablecida', { duration: 2500 });
    };

    const handleOffline = () => {
      setOnline(false);
      toast.dismiss();
      toast.error('Sin conexión a internet', { duration: 4000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null; // No muestra nada visual
};