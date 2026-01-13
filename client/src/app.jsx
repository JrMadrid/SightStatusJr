/*
 * Project: SightStatusJr
 * Author: Juan Ramón Madrid Medina
 * Year: 2026 
 * License: MIT
 */
/* DEFINE LA ESTRUCTURA Y LA LÓGICA PRINCIPAL DE LA APLICACIÓN */
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
// import { createBrowserHistory } from 'history'; // Importar "createBrowserHistory" para crear un historial de navegación.
import './app.css';
import { Toaster } from 'react-hot-toast';
import ToastCleaner from '@elementos/ToasterCleaner';
import Iniciar from "@pages/Login.jsx";
import NotFoundPage from "@pages/NotFound.jsx";
import UsuarioInfo from '@pages/Informativas/Usuario_Infor.jsx';
import SucursalInfo from '@pages/Informativas/Sucursal_Infor.jsx';
import UbicacionInfo from '@pages/Informativas/Ubicacion_Infor.jsx';
import DispositivosInfo from '@pages/Informativas/Dispositivos_Infor.jsx'
import MantenimientosInfo from "@pages/Informativas/Mantenimientos_Infor.jsx";
import ManualInfo from "@pages/Informativas/Manual_Infor.jsx";
import InformeInfo from "@pages/Informativas/Informe_Infor.jsx";
import PanUsers from '@pages/Panels/PanelUsers.jsx'
import PanSucursal from '@pages/Panels/PanelSucursal.jsx';
import PanDispositivos from '@pages/Panels/PanelDispositivo.jsx';
import PanMantenimientos from "@pages/Panels/PanelMantenimiento.jsx";
import PanManuales from "@pages/Panels/PanelManual.jsx";
import Informes from "@pages/Panels/PanelInforme.jsx";
import Navbar from '@elementos/Navbar.jsx';
import DevCredits from "@elementos/DevCredits";
import { UserProvider } from '@context/UserContext.jsx';

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastCleaner />
        <Toaster toastOptions={{ className: 'noti' }} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Iniciar />} />
            <Route path="/usuarios" element={<PanUsers />} />
            <Route path="/sucursales" element={<PanSucursal />} />
            <Route path="/dispositivos" element={<PanDispositivos />} />
            <Route path="/mantenimientos" element={<PanMantenimientos />} />
            <Route path="/manuales" element={<PanManuales />} />
            <Route path="/informes" element={<Informes />} />
            <Route path="/informativa/usuario" element={<UsuarioInfo />} />
            <Route path="/informativa/sucursal/:economico" element={<SucursalInfo />} />
            <Route path="/informativa/ubicacion/:economico" element={<UbicacionInfo />} />
            <Route path="/informativa/dispositivo/:nombre" element={<DispositivosInfo />} />
            <Route path="/informativa/mantenimiento/:economico" element={<MantenimientosInfo />} />
            <Route path="/informativa/manual" element={<ManualInfo />} />
            <Route path="/informativa/informe" element={<InformeInfo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
      <DevCredits />
    </UserProvider>
  );
};

/* Sin Navbar */
function Layout() {
  const location = useLocation(); // Hook para obtener la ubicación actual de la aplicación.
  // Definir las rutas donde no se debe mostrar la barra de navegación.
  const noNavbarPaths = ['/']; // Rutas donde no se debe mostrar la barra de navegación.

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <div className="fondo">
        <Outlet />
      </div>
    </>
  );
};

export default App;
