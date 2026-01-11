/* FUNCIÓN DE ENVIAR MENSAJE DE WHATSAPP */
import '@css/Infor_Sucursal.css';
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = ({ number }) => {
  const mensaje = "Buenas Tardes";
  const numero = number.trim().replace(/\s+/g, "");

  return (
    <a href={`https://wa.me/${numero}?text=${encodeURIComponent(`${mensaje}`)}`}
      target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(108, 255, 108)', fontSize: '0.9rem', padding: '0.3rem' }} >
      <FaWhatsapp />
    </a>
  )
}

export default Whatsapp;