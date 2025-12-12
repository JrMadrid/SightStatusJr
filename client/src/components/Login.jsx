/* COMPONENTE DE ELEMENTO DE INICIO DE SESIÓN */
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from '@api/axiosConfig'; // Importa la configuración personalizada
import '@css/login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPanel = () => {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [psw, setPsw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Verificar si ya tiene sesión activa
  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const url = `/api/auth/check`;
        const response = await axios.get(url);

        // Si hay sesión activa, redirigir al inicio
        if (response.data.iniciado) {
          window.location.href = '/sucursales';
        }
      } catch (error) {
        // Si falla, no pasa nada, se queda en login
        console.log("No hay sesión activa");
      }
    };
    verificarSesion();
  }, []);

  // Leer y comprobar el usuario
  const iniciarSesion = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    const body = {
      nickname,
      psw
    };
    setLoading(true);

    try {
      // URL del backend para hacer login
      const url = `/api/auth/login/user`;
      const response = await axios.post(url, body);

      // Si el login es exitoso, redirigir según el tipo de usuario
      if (response.data.iniciado) {
        toast.success('Sesión iniciada, \n duración de 3 dias', { duration: 3000 });
        // Esperar 3 segundos antes de redirigir
        setTimeout(() => {
          window.location.href = '/sucursales';  // Redirigir a la página de inicio
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        console.error('Error: // Leer y comprobar el usuario, ', error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="loginpanel">
        <h3>Iniciar Sesión</h3>
        <form onSubmit={iniciarSesion}>
          <div className="form-group">
            <label htmlFor="nickname" className='labellogin'>Usuario</label>
            <input className='inputlogin' type="text" id="nickname" name="nickname" maxLength="50" placeholder='Nombre de usuario'
              value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="psw" className='labellogin'>Contraseña</label>
            <span onClick={() => setShowPassword(!showPassword)} className='ojo' >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>{/* Botón para mostrar/ocultar */}
            <input type={showPassword ? "text" : "password"} className='inputlogin' id="psw" name="psw" maxLength="50" placeholder='Contraseña'
              value={psw} onChange={(e) => setPsw(e.target.value)} required />
          </div>
          <button className="loginbutton" type="submit" disabled={loading} style={{ backgroundColor: loading ? 'black' : '' }}>{loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}</button>
          {error && <div className="error">{error}</div>} {/* Mostrar error si existe */}
        </form>
      </div>
      <Toaster toastOptions={{ className: 'noti' }} />
    </>
  );
};

export default LoginPanel;