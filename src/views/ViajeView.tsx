import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../constants/styles";
import Modal from "../components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteViaje, getAllViajes } from "../api/TruckAppAPI";
import { toast } from "sonner";
import type { ViajeCardProps } from "../types";
import ViajesCard from "../components/ViajeCard";

export default function ViajeView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedViajeId, setSelectedViajeId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Query para obtener todos los viajes
  const { data: viajesResponse, isLoading, isError } = useQuery({
    queryKey: ['viajes', currentPage],
    queryFn: () => getAllViajes(currentPage, limit),
    refetchOnWindowFocus: false, 
    staleTime: 1000 * 60 * 5, // Los datos son "frescos" por 5 minutos
  });

  console.log(viajesResponse);
  
  const viajes = viajesResponse?.data || [];
  const meta = viajesResponse?.meta;
  // Mutation para eliminar viaje
  const { mutate: deleteViajeMutation } = useMutation({
    mutationFn: deleteViaje,
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar el viaje');
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Viaje eliminado exitosamente');
      // Invalida el cache para recargar la lista
      queryClient.invalidateQueries({ queryKey: ['viajes'] });
    }
  });

  // Función para manejar eliminación
  const handleDelete = (id: number) => {
    setSelectedViajeId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedViajeId !== null) {
      deleteViajeMutation(selectedViajeId);
      setSelectedViajeId(null);
    }
  };

  // Función para manejar edición
  const handleEdit = (id: number) => {
    navigate(`/admin/viajes/editar/${id}`);
  };

  return (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">

      {/* Modal de confirmación */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={confirmDelete}
              title="Inactivar Viaje"
              message="¿Estás seguro de que deseas cambiar el estado de este viaje? "
              confirmText="Cambiar estado"
              cancelText="Cancelar"
              type="danger"
            />
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="space-y-2">
              <h1 className={`${COLORS["verde_primario"]} text-2xl sm:text-3xl lg:text-4xl font-bold`}>
                Viajes
              </h1>
              <h3 className="text-sm sm:text-base lg:text-lg text-gray-600">
                Registra tus viajes aquí
              </h3>
            </div>

             {/* Botón para la creación de viajes*/ }
            <button className={`${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base`}>
              <Link to="/admin/viajes/agregar" className="px-3 w-full flex items-center">
                Agregar Viaje
              </Link>
            </button>
            </div>
          
            

             {/* Loading State */}
                  {isLoading && (
                    <div className="text-center py-10">
                      <p className="text-gray-600">Cargando viajes...</p>
                    </div>
                  )}
            
                  {/* Error State */}
                  {isError && (
                    <div className="text-center py-10">
                      <p className="text-red-600">Error al cargar los viajes</p>
                    </div>
                  )}
            
                  {/* Content Grid */}
                  {!isLoading && !isError && (
                    <>
                      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
                        {viajes && viajes.length > 0 ? (
                          viajes.map((viaje: ViajeCardProps) => (
                            <ViajesCard
                              key={viaje.id_viaje}
                              camion={viaje.camion}
                              conductor={viaje.conductor}
                              estado={viaje.estado}
                              id_viaje={viaje.id_viaje}
                              num_manifiesto={viaje.num_manifiesto}
                              lugar_destino={viaje.lugar_destino}
                              lugar_origen={viaje.lugar_origen}
                              fecha_inicio={viaje.fecha_inicio}
                              valor={viaje.valor}
                              onDelete={handleDelete}
                              onEdit={handleEdit}
                            />
                          ))
                        ) : (
                          <div className="col-span-full text-center py-10">
                            <p className="text-gray-600">No hay viajes registrados aún</p>
                          </div>
                        )}
                      </div>

                      {/* Paginación */}
                      {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={!meta.hasPrevPage}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              meta.hasPrevPage
                                ? `${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white`
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Anterior
                          </button>
                          
                          <span className="text-gray-700 font-medium px-4">
                            Página {meta.page} de {meta.totalPages}
                          </span>
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPages))}
                            disabled={!meta.hasNextPage}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              meta.hasNextPage
                                ? `${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white`
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Siguiente
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              

  )
}
