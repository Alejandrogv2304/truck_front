import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllGastosViaje } from "../api/TruckAppAPI";
import type { GastoViaje } from "../types";
import GastoViajeCard from "../components/GastoViajeCard";


export default function DetailsViajeView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();

    // Query para obtener datos de gastos del viaje
    const { data: gastosViajeData, isLoading, isError } = useQuery({
      queryKey: ['gastosViaje', id],
      queryFn: () => getAllGastosViaje(Number(id)),
      enabled: true, 
    });

    console.log(gastosViajeData);
    
  return (
    <>
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
        <h1 className="text-2xl font-bold text-green-800 mb-8">Detalles de gastos del viaje</h1>

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
