import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AddCamionView() {
  return (
    <>
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/camiones" className="flex items-center ml-8">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
        <h1 className="text-2xl font-bold">Agregar Camión</h1>
    </div>
    </>
  )
}
