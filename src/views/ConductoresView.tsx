import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../constants/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllConductores } from "../api/TruckAppAPI";
import type { ConductorCardProps } from "../types";
import ConductorCard from "../components/ConductorCard";


export default function ConductoresView() {
  const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCamionId, setSelectedCamionId] = useState<number | null>(null);
  
    // Query para obtener todos los camiones
    const { data: conductores, isLoading, isError } = useQuery({
      queryKey: ['conductores'],
      queryFn: getAllConductores,
      refetchOnWindowFocus: false, 
      staleTime: 1000 * 60 * 5, // Los datos son "frescos" por 5 minutos
    });


    // Función para manejar eliminación
  const handleDelete = (id: number) => {
    setSelectedCamionId(id);
    setIsModalOpen(true);
  };

  // const confirmDelete = () => {
  //   if (selectedCamionId !== null) {
  //     deleteCamionMutation(selectedCamionId);
  //     setSelectedCamionId(null);
  //   }
  // };

  // Función para manejar edición
  const handleEdit = (id: number) => {
    navigate(`/admin/camiones/editar/${id}`);
  };

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 font-ubuntu">

    
   {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="space-y-2">
          <h1 className={`${COLORS["verde_primario"]} text-2xl sm:text-3xl lg:text-4xl font-bold`}>
            Conductores
          </h1>
          <h3 className="text-sm sm:text-base lg:text-lg text-gray-600">
            Gestiona tús conductores aquí
          </h3>
        </div>
        
        <button className={`${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base`}>
         <Link to="/admin/conductores/agregar" className="px-3 w-full flex items-center">
            Agregar Conductor
          </Link>
        </button>
      </div>


      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Cargando conductores...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-600">Error al cargar los condcutores</p>
        </div>
      )}


       {/* Content Grid */}
            {!isLoading && !isError && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {conductores && conductores.length > 0 ? (
                  conductores.map((conductor: ConductorCardProps) => (
                    <ConductorCard
                      key={conductor.id_conductor}
                      nombre={conductor.nombre}
                      apellido={conductor.apellido}
                      estado={conductor.estado}
                      id_conductor={conductor.id_conductor}
                      identificacion={conductor.identificacion}
                      fecha_vinculacion={conductor.fecha_vinculacion}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-600">No hay camiones registrados aún</p>
                  </div>
                )}
              </div>
            )}
            </div>
</>
  )
}
