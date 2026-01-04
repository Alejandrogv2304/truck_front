import type { GastoViaje } from "../types";
import { FaRegTrashAlt } from "react-icons/fa";

type GastoViajeCardProps = GastoViaje & {
  onDelete: (id: number) => void;
};

export default function GastoViajeCard({id_gasto_viaje, valor, tipo_gasto, onDelete}:GastoViajeCardProps) {
  return (
    <>

    <div className="flex justify-between  bg-white p-2  rounded-lg shadow-md border-1 border-slate-100 hover:shadow-lg transition-shadow duration-200 lg:ml-4 lg:mr-8 hover:bg-slate-200">
        <div className=" flex flex-col gap-y-2 ml-4">
            <h2 className="text-black font-bold text-lg ">{id_gasto_viaje} - {tipo_gasto}</h2>
            <span className="rounded-lg p-1 bg-slate-200 text-green-800 font-semibold" >  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Number(valor))}</span>
        </div>

        <div 
          onClick={() => onDelete(id_gasto_viaje)}
          className="  flex items-center rounded-lg hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer hover:bg-red-50 mr-4"
        >
            <FaRegTrashAlt className="text-red-600 text-xl cursor-pointer " />
        </div>

    </div>
    </>
  )
}
