import { FaRegCalendar, FaRegMoneyBillAlt, FaTrash, FaTruck } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import type { GastoCamionCardProps } from "../types";

export default function GastoCamionCard({valor, fecha, tipo_gasto, placa,descripcion, onDelete, id_gasto_camion }: GastoCamionCardProps) {
  return (
    <>
     <div className={`bg-[#EDFAF2] font-ubuntu rounded-lg p-4 border-2 border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-200`}>
          
                 
          
                  <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-green-800">{tipo_gasto}</h1>
                   
                  </div>
                  
          
                  <div className="flex items-center justify-items-start mb-4 ">
                    <MdOutlineDescription className="text-green-800 text-xl mr-3"/>
                    <span className="text-lg font-medium text-slate-600 mr-3">{descripcion} </span>
                      
                  </div>
    
                  <div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex flex-row">
                        <FaTruck className="text-green-800 text-xl mr-3 mt-1"/>
                        <span className="text-lg font-medium text-slate-600">{placa}</span>
                      </div>
    
    
                     <div className="flex flex-row">
                      <FaRegCalendar className="text-green-800 text-xl mr-3 mt-1"/>
                       <span className={`text-lg text-green-800 font-medium`}>
                          {new Date(fecha).toLocaleDateString()}</span>
                     </div>
    
                     <div className="flex flex-row">
                      <FaRegMoneyBillAlt className="text-green-800 text-xl mr-3 mt-1"/>
                       <span className={`text-lg text-green-800 font-medium`}>
                          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor)}</span>
                     </div>
    
                    
                      
                  </div>
    
                 
                {/*Botones */}
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-items-start mb-2">
                      <button 
                        onClick={() => onDelete(id_gasto_camion)}
                        className="mr-6 focus:outline-none"
                        aria-label="Eliminar viaje"
                      >
                        <FaTrash className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 hover:scale-125 transition-all duration-200" />
                      </button>
                      
                      
          
                  </div>
                  
                  </div>
    
                  
          
              </div>
    </>
  )
}
