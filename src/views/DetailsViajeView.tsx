import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getAllGastosViaje, deleteGastoViaje } from "../api/TruckAppAPI";
import type { GastoViaje } from "../types";
import GastoViajeCard from "../components/GastoViajeCard";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import Modal from "../components/Modal";


export default function DetailsViajeView() {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGastoId, setSelectedGastoId] = useState<number | null>(null);

    // Query para obtener datos de gastos del viaje
    const { data: gastosViajeData, isLoading, isError } = useQuery({
      queryKey: ['gastosViaje', id],
      queryFn: () => getAllGastosViaje(Number(id)),
      enabled: true, 
    });

    //  ESTRATEGIA 1: Cálculo del total en el frontend usando reduce()
    // useMemo optimiza el cálculo para que solo se ejecute cuando gastosViajeData cambie
    const totalGastos = useMemo(() => {
      if (!gastosViajeData || gastosViajeData.length === 0) return 0;
      // Convertimos explícitamente a número porque el backend devuelve decimales como strings
      return gastosViajeData.reduce((suma: number, gasto: GastoViaje) => {
        const valorNumerico = Number(gasto.valor);
        return suma + (isNaN(valorNumerico) ? 0 : valorNumerico);
      }, 0);
    }, [gastosViajeData]);

    // Mutación para eliminar gasto con actualización optimista
    const deleteGastoMutation = useMutation({
      mutationFn: deleteGastoViaje,
      // onMutate se ejecuta ANTES de llamar al servidor
      onMutate: async (gastoId: number) => {
        // 1. Cancelar cualquier query en curso para evitar que sobrescriban nuestra actualización
        await queryClient.cancelQueries({ queryKey: ['gastosViaje', id] });
        
        // 2. Guardar snapshot del estado actual (por si necesitamos revertir)
        const previousGastos = queryClient.getQueryData(['gastosViaje', id]);
        
        // 3. Actualizar la caché INMEDIATAMENTE (optimista)
        queryClient.setQueryData(['gastosViaje', id], (old: GastoViaje[] | undefined) => {
          if (!old) return [];
          return old.filter(gasto => gasto.id_gasto_viaje !== gastoId);
        });
        
        // 4. Retornar el contexto para usar en caso de error
        return { previousGastos };
      },
      // onError se ejecuta SI la petición al servidor falla
      onError: (_error, _gastoId, context) => {
        // Revertir a los datos anteriores
        if (context?.previousGastos) {
          queryClient.setQueryData(['gastosViaje', id], context.previousGastos);
        }
        toast.error('Error al eliminar el gasto');
      },
      // onSuccess se ejecuta cuando el servidor confirma el éxito
      onSuccess: () => {
        toast.success('Gasto eliminado correctamente');
      },
      // onSettled se ejecuta siempre al final (éxito o error)
      onSettled: () => {
        // Revalidar para asegurar sincronización con el servidor
        queryClient.invalidateQueries({ queryKey: ['gastosViaje', id] });
      }
    });

    // Función para abrir el modal de confirmación
    const handleDeleteGasto = (gastoId: number) => {
      setSelectedGastoId(gastoId);
      setIsModalOpen(true);
    };

    // Función para confirmar la eliminación
    const confirmDelete = () => {
      if (selectedGastoId !== null) {
        deleteGastoMutation.mutate(selectedGastoId);
        setSelectedGastoId(null);
      }
    };

    
    
  return (
    <>
    {/* Modal de confirmación */}
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={confirmDelete}
      title="Eliminar Gasto"
      message="¿Estás seguro de que deseas eliminar este gasto? Esta acción no se puede deshacer."
      confirmText="Eliminar"
      cancelText="Cancelar"
      type="danger"
    />

    {/* Div de inicio */}
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/viajes" className="flex items-center ml-8 text-green-800">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
            <div className="font-ubuntu">
          <h1 className="text-3xl font-bold text-green-800"> Volver a viajes</h1>
          </div>
          
    </div>

    {/* Manejo de errores en la interfaz*/}
     {/* Loading State */}
      {isLoading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Cargando gastos del viaje...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-600">Error al cargar los gastos del viaje</p>
        </div>
      )}

    {/* Tabla de gastos */}
    <div className="grid rounded-lg grid-cols-1 p-4 mt-6 shadow-md font-ubuntu border-1 w-7/8 border-black ml-8 mr-3">
        <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-green-800 mb-8">Detalles de gastos del viaje</h1>

        <div className="lg:mr-12">
            <button className="bg-green-700 p-2 rounded-lg text-white hover:bg-green-800  cursor-pointer">
                + Añadir gasto
            </button>
          </div>

        </div>

        

        {/* Content Grid */}
              {!isLoading && !isError && (
                <div className="grid grid-cols-1 gap-2 lg:w-4/5">
                  {gastosViajeData && gastosViajeData.length > 0 ? (
                    gastosViajeData.map((gasto: GastoViaje) => (
                     <GastoViajeCard
                        key={gasto.id_gasto_viaje}
                        id_gasto_viaje={gasto.id_gasto_viaje}
                        valor={gasto.valor}
                        estado={gasto.estado}
                        tipo_gasto={gasto.tipo_gasto}
                        onDelete={handleDeleteGasto}
                     />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-600">No hay gastos registrados aún</p>
                    </div>
                  )}
                </div>
              )}

              {/* Total de gastos - Se actualiza automáticamente con reduce() */}
        <div className=" p-4 rounded-lg mt-4  ml-5 mr-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total Gastos:</span>
            <span className="text-2xl font-bold text-green-800">
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalGastos)}
            </span>
          </div>
        </div>

    </div>
    </>
  )
}
