// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../api/TruckAppAPI";

export default function ProtectedRoute() {
  const { data, isError, isLoading } = useQuery({
    queryFn: getAdmin,
    queryKey: ['admin'],
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <Navigate to="/auth/login" replace />;
  if (data) return <Outlet />;
  
  return <Navigate to="/auth/login" replace />;
}