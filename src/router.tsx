import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CamionView from "./views/CamionView";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCamionView from "./views/AddCamionView";
import ConductoresView from "./views/ConductoresView";
import AddConductorView from './views/AddConductorView';

function Router() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="/auth/login" element={<LoginView/>}/>
            <Route path="/auth/register" element={<RegisterView/>}/>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route element={<AppLayout/>}>
            <Route path="/admin/dashboard" element={<DashboardView/>}/>
            <Route path="/admin/camiones" element={<CamionView/>}/>
            <Route path="/admin/camiones/agregar" element={<AddCamionView/>}/>
            <Route path="/admin/camiones/editar/:id" element={<AddCamionView/>}/>
            <Route path="/admin/conductores" element={<ConductoresView/>}/>
            <Route path="/admin/conductores/agregar" element={<AddConductorView/>}/>
            <Route path="/admin/conductores/editar/:id" element={<AddConductorView/>}/>
          </Route>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router
