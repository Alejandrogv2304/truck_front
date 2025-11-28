import { FaToggleOn } from "react-icons/fa";
import type { ConductorCardProps } from "../types";
import { MdEditSquare } from "react-icons/md";

export default function ConductorCard({nombre,apellido,identificacion,estado, fecha_vinculacion,id_conductor, onDelete, onEdit}: ConductorCardProps) {
  return (
    <div className="bg-[#EDFAF2] font-ubuntu rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
            <div>
               <h1 className="text-2xl font-semibold text-green-800">{nombre}</h1>
               <h2 className="text-xl text-green-900">{apellido}</h2>
            </div>
            
            <span className={`text-sm ${estado === "activo" ? "bg-green-700" : "bg-red-500"} text-white p-1 rounded-lg font-medium`}>
                {estado}</span>
            
        </div>
        
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg  text-slate-600"><span className="font-bold">Identificación:</span> {identificacion}</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg  text-slate-600"><span className="font-bold">Fecha Vinculación:</span> {fecha_vinculacion}</h1>
        </div>

        {/*Botones */}
              <div className="flex items-center justify-items-start mb-2">
                    <button 
                      onClick={() => onDelete(id_conductor)}
                      className="mr-6 focus:outline-none"
                      aria-label="Eliminar conductor"
                    >
                      <FaToggleOn className="text-4xl cursor-pointer text-gray-600 hover:text-red-500 hover:scale-125 transition-all duration-200" />
                    </button>
                    
                    <button 
                      onClick={() => onEdit(id_conductor)}
                      className="focus:outline-none"
                      aria-label="Editar conductor"
                    >
                      <MdEditSquare className="text-4xl cursor-pointer text-gray-600 hover:text-green-600 hover:scale-125 transition-all duration-200"/>
                    </button>
        
                </div>
    </div>
  )
}
