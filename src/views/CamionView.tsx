import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../constants/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCamion, getAllCamiones } from "../api/TruckAppAPI";
import CamionCard from "../components/CamionCard";
import type { CamionCardProps } from "../types";
import { toast } from "sonner";
import Modal from "../components/Modal";
import { useState } from "react";


export default function CamionView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCamionId, setSelectedCamionId] = useState<number | null>(null);

  // Query para obtener todos los camiones
  const { data: camiones, isLoading, isError } = useQuery({
    queryKey: ['camiones'],
    queryFn: getAllCamiones,
    refetchOnWindowFocus: false, 
    staleTime: 1000 * 60 * 5, // Los datos son "frescos" por 5 minutos
  });

  // Mutation para eliminar camión
  const { mutate: deleteCamionMutation } = useMutation({
    mutationFn: deleteCamion,
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar el camión');
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Camión eliminado exitosamente');
      // Invalida el cache para recargar la lista
      queryClient.invalidateQueries({ queryKey: ['camiones'] });
    }
  });

  // Función para manejar eliminación
  const handleDelete = (id: number) => {
    setSelectedCamionId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCamionId !== null) {
      deleteCamionMutation(selectedCamionId);
      setSelectedCamionId(null);
    }
  };

  // Función para manejar edición
  const handleEdit = (id: number) => {
    navigate(`/admin/camiones/editar/${id}`);
  };

  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Inactivar Camión"
        message="¿Estás seguro de que deseas cambiar el estado de este camión? "
        confirmText="Cambiar estado"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="space-y-2">
          <h1 className={`${COLORS["verde_primario"]} text-2xl sm:text-3xl lg:text-4xl font-bold`}>
            Camiones
          </h1>
          <h3 className="text-sm sm:text-base lg:text-lg text-gray-600">
            Administra tus camiones aquí
          </h3>
        </div>
        
        <button className={`${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base`}>
         <Link to="/admin/camiones/agregar" className="px-3 w-full flex items-center">
            Agregar Camión
          </Link>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Cargando camiones...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-600">Error al cargar los camiones</p>
        </div>
      )}

      {/* Content Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {camiones && camiones.length > 0 ? (
            camiones.map((camion: CamionCardProps) => (
              <CamionCard
                key={camion.id_camion}
                placa={camion.placa}
                modelo={camion.modelo}
                estado={camion.estado}
                id_camion={camion.id_camion}
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
  )
}
