import { Link } from "react-router-dom";
import { COLORS } from "../constants/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGastoCamion, getAllCamionPlacaAndId, getAllGastosCamion } from "../api/TruckAppAPI";
import { useState } from "react";
import Modal from "../components/Modal";
import { toast } from "sonner";
import type { GastoCamionCardProps } from "../types";
import GastoCamionCard from "../components/GastoCamionCard";


export default function GastosView() {
const queryClient = useQueryClient();
const [currentPage, setCurrentPage] = useState(1);
const [selectedPlaca, setSelectedPlaca] = useState<string>("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedGastoCamionId, setSelectedGastoCamionId] = useState<number | null>(null);
const limit = 20;

{/*Query para traer los gastos de camión */}

  const { data: gastosCamionData, isLoading, isError } = useQuery({
    queryKey: ['gastosCamion', currentPage, selectedPlaca],
    queryFn: () => getAllGastosCamion(currentPage, limit, selectedPlaca),
    refetchOnWindowFocus: false, 
    staleTime: 1000 * 60 * 5, // Los datos son "frescos" por 5 minutos
  });

  console.log(gastosCamionData);

  const gastos = gastosCamionData?.data || [];
  const meta = gastosCamionData?.meta;

  // Mutation para eliminar el gasto de camión
  const { mutate: deleteGastoCamionMutation } = useMutation({
    mutationFn: deleteGastoCamion,
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar el gasto de camión');
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Gasto de camión eliminado exitosamente');
      // Invalida el cache para recargar la lista
      queryClient.invalidateQueries({ queryKey: ['gastosCamion'] });
    }
  });

  {/* Query para traer las placas */}

   // Query para obtener los camiones 
    const { data: camionesData } = useQuery({
      queryKey: ['camionesPlaca'],
      queryFn: () => getAllCamionPlacaAndId(),
      enabled: true,
    });

     // Función para manejar filtrado de gastos
  const handleFiltrarGastos = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
    queryClient.invalidateQueries({ queryKey: ['gastosCamion'] });
  };

   const confirmDelete = () => {
    if (selectedGastoCamionId !== null) {
      deleteGastoCamionMutation(selectedGastoCamionId);
      setSelectedGastoCamionId(null);
    }
  };

   // Función para manejar eliminación
  const handleDelete = (id: number) => {
    setSelectedGastoCamionId(id);
    setIsModalOpen(true);
  };

  return (
    <>
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
    {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="space-y-2">
          <h1 className={`${COLORS["verde_primario"]} text-2xl sm:text-3xl lg:text-4xl font-bold`}>
            Gastos de Camiones
          </h1>
          <h3 className="text-sm sm:text-base lg:text-lg text-gray-600">
            Administra tus gastos de camiones aquí
          </h3>
        </div>
        
        <button className={`${COLORS["dark_secundary"]} ${COLORS["hover"]} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base`}>
         <Link to="/admin/gastos/agregar" className="px-3 w-full flex items-center">
            Agregar Gasto
          </Link>
        </button>
      </div>


        {/*   Filtros para traer gastos de camión */}

        <div className="grid grid-cols-1 md:grid-cols-2">

         <form onSubmit={handleFiltrarGastos} className="">
           <div className="grid grid-cols-1 space-y-3 ">
                              <label
                                htmlFor="idCamion"
                                className="text-lg font-semibold text-green-800 pl-3"
                              >
                                Camion
                              </label>
                              <select
                                id="placa"
                                value={selectedPlaca}
                                onChange={(e) => setSelectedPlaca(e.target.value)}
                                className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-slate-200`}
                              >
                                <option value="">Todos los camiones</option>
                                {camionesData?.map((camion: {id_camion: number, placa: string}) => (
                                  <option key={camion.id_camion} value={camion.placa}>{camion.placa} </option>
                                ))}
                               
                              </select>
                             
                            </div>
           
         </form>

         <div className={`flex flex-col items-start justify-start `}>
         <button 
           onClick={handleFiltrarGastos}
           type="button"
           className={`${COLORS["verde_primario"]} ${COLORS["hover"]} cursor-pointer text-black  sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base mt-6 shadow-md border-slate-200 border-2`}
         >
         Filtrar Gastos
         </button>
            
         </div>

        </div>

        {/* Content Grid */}
                          {!isLoading && !isError && (
                            <>
                              <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 mt-8">
                                {gastos && gastos.length > 0 ? (
                                  gastos.map((gasto: GastoCamionCardProps) => (
                                    <GastoCamionCard
                                      key={gasto.id_gasto_camion}
                                      placa={gasto.placa}
                                      valor={gasto.valor}
                                      fecha={gasto.fecha}
                                      descripcion={gasto.descripcion}
                                      onDelete={handleDelete}
                                      tipo_gasto={gasto.tipo_gasto}
                                      id_gasto_camion={gasto.id_gasto_camion}
                                    />
                                  ))
                                ) : (
                                  <div className="col-span-full text-center py-10">
                                    <p className="text-gray-600">No hay gastos para este camión registrados aún</p>
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
    </>
  )
}
