import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/LoginView";

function Router() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="/auth/login" element={<LoginView/>}/>
            
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router
