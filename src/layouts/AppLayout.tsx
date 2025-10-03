import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../api/TruckAppAPI";
import { useState } from "react";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function AppLayout() {

    const [sidebarToggle, setSidebarToggle] = useState(true);

    const {data , isError, isLoading} = useQuery({
        queryFn: getAdmin,
        queryKey: ['admin'],
        retry: 1,
        refetchOnWindowFocus:false
    })

   if(isLoading) return 'Cargando ...'
   if(isError){
    return <Navigate to={'/auth/login'}/>
   }
    
      if(data) return (
        <>
      <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      {/* El div principal ahora tiene margen izquierdo dinámico */}
      <div className={`transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} `}>
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <Outlet />
      </div>
      </>
      )
}