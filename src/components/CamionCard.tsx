import type { CamionCardProps } from "../types";
import { FaToggleOn } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";


export default function CamionCard({placa, modelo, estado, id_camion, onDelete, onEdit}: CamionCardProps) {
  return (
    <div className={`${estado === "activo" ? "bg-[#EDFAF2]" : "bg-slate-100"} font-ubuntu rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200`}>

        <FaTruckMoving  className="text-3xl text-green-900 mb-2"/>

        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-green-800">{placa}</h1>
            <span className={`text-sm ${estado === "activo" ? "bg-green-700" : "bg-red-500"} text-white p-1 rounded-lg font-medium`}>
                {estado}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl  text-slate-600">{modelo}</h1>
            <span className={`text-lg text-green-800 font-medium`}>
                {id_camion}</span>
        </div>
      {/*Botones */}
      <div className="flex items-center justify-items-start mb-2">
            <button 
              onClick={() => onDelete(id_camion)}
              className="mr-6 focus:outline-none"
              aria-label="Eliminar camión"
            >
              <FaToggleOn className="text-4xl cursor-pointer text-gray-600 hover:text-red-500 hover:scale-125 transition-all duration-200" />
            </button>
            
            <button 
              onClick={() => onEdit(id_camion)}
              className="focus:outline-none"
              aria-label="Editar camión"
            >
              <MdEditSquare className="text-4xl cursor-pointer text-gray-600 hover:text-green-600 hover:scale-125 transition-all duration-200"/>
            </button>

        </div>

    </div>
  )
}
