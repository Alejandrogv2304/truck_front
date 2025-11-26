import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import type { Camion } from "../types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createCamion } from "../api/TruckAppAPI";

export default function AddCamionView() {
    const navigate = useNavigate();

    const initialValues: Camion = {
        placa: "",
        modelo: "",
        estado: "",
      };

       const {
          register,
          reset,
          handleSubmit,
          formState: { errors },
        } = useForm<Camion>({ defaultValues: initialValues });

    // Mutation con React Query
    const { mutate } = useMutation({
      mutationFn: createCamion,
      onError: (error) => {
        toast.error(error.message || 'Error al agregar el camión');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Camión agregado exitosamente');
        reset();
        // setTimeout(() => navigate('/admin/camiones') , 2000);
        // navigate('/admin/camiones')
      }
    });

    const handleAddCamion = (formData: Camion) => {
      mutate(formData);
    };
  return (
    <>
    {/* Div de inicio */}
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/camiones" className="flex items-center ml-8 text-green-800">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
          <div className="font-ubuntu">
        <h1 className="text-3xl font-bold text-green-800">Agregar Camión</h1>
        <h2 className="text-lg text-green-900">Registra los camiones que te pertenecen</h2>
        </div>
    </div>

     {/* Formulario */}
    <div>
        <form 
        className="max-w-3xl mx-6 bg-[#EDFAF2] p-8 mt-6 rounded-lg shadow-md font-ubuntu border-slate-200 border-1"
         onSubmit={handleSubmit(handleAddCamion)}>
            <h2 className="text-green-800 font-bold text-xl">Información del camión</h2>
            <h3 className="text-green-700 mb-6">Completa los datos del vehículo</h3>
         
         {/* Modelo */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="modelo"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Modelo
                   </label>
                   <input
                     id="modelo"
                     type="text"
                     placeholder="Modelo"
                     className="bg-white border-white border-2 p-2 rounded-lg placeholder-slate-600 w-lg"
                     {...register("modelo", {
                       required: "El modelo es obligatorio",
                     })}
                   />
                   {errors.modelo && (
                     <ErrorMessage>{errors.modelo.message}</ErrorMessage>
                   )}
                 </div>

                  {/* Placa */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="placa"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Placa
                   </label>
                   <input
                     id="placa"
                     type="text"
                     placeholder="Placa"
                     className="bg-white uppercase border-white border-2 p-2 rounded-lg placeholder-slate-600 w-xs"
                     {...register("placa", {
                       required: "La placa es obligatoria",
                       pattern: {
                       value: /^[A-Z]{3}\d{3}$/ ,
                       message: "El formato de la placa no es válido (Ej: ABC123)",
                       },
                       validate: (value) => {
                         const trimmed = value.trim();
                         if (trimmed !== value) {
                           return "La placa no puede tener espacios";
                         }
                         return true;
                       }
                     })}
                   />
                   {errors.placa && (
                     <ErrorMessage>{errors.placa.message}</ErrorMessage>
                   )}
                 </div>

                  {/* Estado */}
                 <div className="grid grid-cols-1 space-y-3 mb-12">
                   <label
                     htmlFor="estado"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Estado
                   </label>
                   <select
                     id="estado"
                     className="bg-white border-white border-2 p-2 rounded-lg text-slate-600 w-xs"
                     {...register("estado", {
                       required: "El estado es obligatorio",
                     })}
                   >
                     <option value="">Selecciona un estado</option>
                     <option value="activo">Activo</option>
                     <option value="inactivo">Inactivo</option>
                   </select>
                   {errors.estado && (
                     <ErrorMessage>{errors.estado.message}</ErrorMessage>
                   )}
                 </div>


                 <input
                  type="submit"
                  className="bg-green-900 p-1 text-lg w-xs  block text-white rounded-xs font-bold cursor-pointer hover:bg-green-600"
                  value='Registrar Camión'
                  />
        </form>
    </div>

    </>
  )
}
