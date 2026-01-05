import { Link } from "react-router-dom";
import { COLORS } from "../constants/styles";


export default function GastosView() {
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


      </div>
    </>
  )
}
