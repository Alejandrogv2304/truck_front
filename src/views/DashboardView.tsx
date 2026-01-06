import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaMoneyBillAlt } from "react-icons/fa";
import { getEstadisticasGenerales, getEstadisticasGraficas } from "../api/TruckAppAPI";
import type { EstadisticasGenerales, EstadisticasGraficas } from "../types";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DashboardView() {

  const { data: estadisticasGraficas } = useQuery<EstadisticasGraficas>({
      queryKey: ['estadisticasGraficas'],
      queryFn: () => getEstadisticasGraficas(),
      enabled: true,
    });

  const { data: estadisticasGenerales } = useQuery<EstadisticasGenerales>({
      queryKey: ['estadisticasGenerales'],
      queryFn: () => getEstadisticasGenerales(),
      enabled: true,
    });

    console.log('Estadísticas Generales:', estadisticasGenerales);

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
            
            <span className="font-bold text-3xl text-green-900">{estadisticasGenerales?.total || 0}</span>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 bg-white border-2 border-slate-200">
           <div className="flex flex-col space-y-16">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold space-y-3 text-green-800">Ingresos Totales</h1>
              <FaMoneyBillAlt className="text-2xl text-green-900" />
            </div>
            
            <span className="font-bold text-3xl text-green-900">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(estadisticasGenerales?.ingresos || 0)}</span>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 bg-white border-2 border-slate-200">
           <div className="flex flex-col space-y-16">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold space-y-3 text-red-900">Gastos Totales</h1>
              <FaMoneyBillAlt className="text-2xl text-red-800" />
            </div>
            
            <span className="font-bold text-3xl text-red-800">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(estadisticasGenerales?.egresos || 0)}</span>
          </div>
        </div>
        
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-4  ">
        <div className="col-start-1 col-end-4">
        {/* Left Column - Main Content */}
        <ComposedChart
      style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={estadisticasGraficas?.data || []}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="mes" scale="band" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="balance" barSize={20} fill="#01b09e" />
      <Line type="monotone" dataKey="balance" stroke="#ff7300" />
      
    </ComposedChart>

        </div>
      </div>
    </div>
  )
}
