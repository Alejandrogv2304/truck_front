import { Link } from "react-router-dom";
import { COLORS } from "../constants/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCamionPlacaAndId, getAllGastosCamion } from "../api/TruckAppAPI";
import { useState } from "react";


export default function GastosView() {
const queryClient = useQueryClient();
const [currentPage, setCurrentPage] = useState(1);
const [selectedPlaca, setSelectedPlaca] = useState<string>("");
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

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
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
                                className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-white`}
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

      </div>
    </>
  )
}
