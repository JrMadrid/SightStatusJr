/* ICONO DE SEÑALIZACIÓN DE ESTADO DE CONEXIÓN */
import { useState, useEffect } from "react";
import { FaNetworkWired } from "react-icons/fa";

export default function ConexionIcono() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <FaNetworkWired className="iconoConexion"
      title={online ? "Conectado" : "Sin conexión"}
      style={{
        color: online ? "#0fb062ff" : "#ae1332ff",
        transition: "color 0.1s ease",
      }}
    />
  );
};