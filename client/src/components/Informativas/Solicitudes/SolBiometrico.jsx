/* PANEL DE SOLICITUD PARA BIOMETRICO */
import { toast } from 'react-hot-toast';
import axios from '@api/axiosConfig';
import '@css/Infor_Sucursal.css';

const PanelBiometrico = (acceso) => {
  const comando = async (commandId) => {
    const url = `/api/informativa/status/aplicacion/solicitud`;
    toast.promise(
      axios.post(url, { id: commandId })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Sin respuesta');
          }
          return response.data;
        }),
      {
        loading: 'Solicitando...',
        success: (data) => {
          if (data.message) {
            return <b style={{ color: 'green', fontSize: '25px' }}>Desbloqueo exitoso.</b>;
          } else {
            return <b style={{ color: 'red', fontSize: '25px' }}>Desbloqueo no exitoso.</b>;
          }
        },
        error: () => {
          return <b>!Ocurrió un error!</b>;
        },
      },
      {
        style: {
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '25px',
          maxHeight: '25px',
        },
        success: {
          duration: 6000,
          icon: null,
        },
      }
    );
  };

  return (
    <>
      {acceso.acceso !== 'Sin conexión TCP' && (
        <div className="solbiometrico">
          <button className="solicitud" id='desbloquearPuerta' onClick={() => comando(31)}>
            {'Desbloquear Puerta'}
          </button>
        </div>
      )}
    </>
  );
};

export default PanelBiometrico;