import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";

function Router() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="/auth/login" element={<LoginView/>}/>
            <Route path="/auth/register" element={<RegisterView/>}/>
        </Route>

        <Route element={<AppLayout/>}>
           <Route path="/admin/dashboard" element={<DashboardView/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router
