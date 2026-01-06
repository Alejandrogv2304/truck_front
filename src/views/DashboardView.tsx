import { FaTruck, FaMoneyBillAlt } from "react-icons/fa";

export default function DashboardView() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Resumen general de tu operación
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Stat Cards irán aquí */}
        <div className="shadow-sm rounded-lg p-6 bg-white border-2 border-slate-200">
          <div className="flex flex-col space-y-16">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold space-y-3 text-green-800">Viajes Totales</h1>
            <FaTruck className="text-2xl text-green-900" />
          </div>
            
            <span className="font-bold text-3xl text-green-900">20</span>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 bg-white border-2 border-slate-200">
           <div className="flex flex-col space-y-16">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold space-y-3 text-green-800">Ingresos Totales</h1>
              <FaMoneyBillAlt className="text-2xl text-green-900" />
            </div>
            
            <span className="font-bold text-3xl text-green-900">$2000000</span>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 bg-white border-2 border-slate-200">
           <div className="flex flex-col space-y-16">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold space-y-3 text-green-800">Gastos Totales</h1>
              <FaMoneyBillAlt className="text-2xl text-red-800" />
            </div>
            
            <span className="font-bold text-3xl text-red-800">$2000000</span>
          </div>
        </div>
        
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 ">
        {/* Left Column - Main Content */}
        

        
      </div>
    </div>
  )
}
