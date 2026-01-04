import type { ViajeCardProps } from "../types";
import { MdEditSquare } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUser,  FaRegCalendar, FaRegMoneyBillAlt,FaRoad,FaToggleOn  } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ViajesCard({fecha_inicio, lugar_origen,num_manifiesto, lugar_destino,conductor,valor, camion, estado,id_viaje, onDelete, onEdit}:ViajeCardProps) {
  return (
    
      <div className={`${estado === "activo" ? "bg-[#EDFAF2]" : "bg-slate-100"} font-ubuntu rounded-lg p-4 border-2 border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-200`}>
      
              <FaRoad  className="text-3xl text-green-900 mb-2"/>
      
              <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-green-800">{camion}</h1>
                  <span className={`text-sm ${estado === "activo" ? "bg-green-700" : "bg-red-500"} text-white p-1 rounded-lg font-medium`}>
                      {estado}</span>
              </div>
      
              <div className="flex items-center justify-items-start mb-4 ">
                <FaLocationDot className="text-green-800 text-xl mr-3"/>
                <span className="text-lg font-medium text-slate-600 mr-3">{lugar_origen}  -</span>
                  <span className={`text-lg text-slate-600 font-medium`}>
                      {lugar_destino}</span>
              </div>

              <div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex flex-row">
                    <FaRegUser className="text-green-800 text-xl mr-3 mt-1"/>
                    <span className="text-lg font-medium text-slate-600">{conductor}</span>
                  </div>


                 <div className="flex flex-row">
                  <FaRegCalendar className="text-green-800 text-xl mr-3 mt-1"/>
                   <span className={`text-lg text-green-800 font-medium`}>
                      {new Date(fecha_inicio).toLocaleDateString()}</span>
                 </div>

                 <div className="flex flex-row">
                  <FaRegMoneyBillAlt className="text-green-800 text-xl mr-3 mt-1"/>
                   <span className={`text-lg text-green-800 font-medium`}>
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor)}</span>
                 </div>

                 <div className="flex flex-row">
                  <IoIosInformationCircle className="text-green-800 text-xl mr-3 mt-1"/>
                   <span className={`text-lg text-green-800 font-medium`}>
                      {num_manifiesto}</span>
                 </div>
                  
              </div>

             
            {/*Botones */}
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-items-start mb-2">
                  <button 
                    onClick={() => onDelete(id_viaje)}
                    className="mr-6 focus:outline-none"
                    aria-label="Eliminar viaje"
                  >
                    <FaToggleOn className="text-4xl cursor-pointer text-gray-600 hover:text-red-500 hover:scale-125 transition-all duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => onEdit(id_viaje)}
                    className="focus:outline-none"
                    aria-label="Editar viaje"
                  >
                    <MdEditSquare className="text-4xl cursor-pointer text-gray-600 hover:text-green-600 hover:scale-125 transition-all duration-200"/>
                  </button>
      
              </div>
              <Link to={`/admin/viajes/${id_viaje}`}>  
              <button className="bg-white p-2 cursor-pointer rounded-lg hover:bg-green-500 hover:text-white hover:shadow-lg transition-shadow duration-200 flex items-center">
                  <span className="text-lg font-semibold text-green-700 hover:text-white"> Ver detalles</span>
                </button>
              </Link>
              </div>

              
      
          </div>
    
  )
}
