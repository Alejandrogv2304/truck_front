import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { GastoCamion } from "../types";
import { createGastoCamion, getAllCamionPlacaAndId } from "../api/TruckAppAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";


export default function AddGastosView() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const initialValues: GastoCamion = {
           valor: 0,
           tipo_gasto: "",
           descripcion: "",
           fecha: new Date(),
           id_camion: 1,
         };

   const {
             register,
             reset,
             handleSubmit,
             formState: { errors },
           } = useForm<GastoCamion>({ defaultValues: initialValues });

    const { data: camionesData } = useQuery({
      queryKey: ['camionesPlaca'],
      queryFn: () => getAllCamionPlacaAndId(),
      enabled: true,
    });

        // Mutation para crear
    const createMutation = useMutation({
      mutationFn: createGastoCamion,
      onError: (error) => {
        toast.error(error.message || 'Error al crear el gasto del camión');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Gasto del camión creado exitosamente');
        reset();
        queryClient.invalidateQueries({ queryKey: ['gastosCamion'] });
        setTimeout(() => navigate('/admin/gastos'), 1500);
      }
    });

     const handleAddGastoCamion = (formData: GastoCamion) => {
      console.log('Datos del formulario antes de transformar:', formData);
      
      // Transformar los datos para asegurar que sean números enteros válidos
      const idCamion = parseInt(String(formData.id_camion), 10);
      const valor = parseFloat(String(formData.valor));

      // Validar que las conversiones sean exitosas
      if (isNaN(idCamion) || idCamion <= 0) {
        toast.error('Debe seleccionar un camión válido');
        return;
      }

      if (isNaN(valor) || valor < 0) {
        toast.error('El valor debe ser un número válido');
        return;
      }

        // En modo creación, enviar todos los campos
        const dataToSend = {
          valor: formData.valor,
          tipo_gasto: formData.tipo_gasto,
          descripcion: formData.descripcion,
          fecha: formData.fecha,
          id_camion: formData.id_camion,
        }
        
        
        createMutation.mutate(dataToSend);
      
    };

  return (
   <>
   {/* Div de inicio */}
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/gastos" className="flex items-center ml-8 text-green-800">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
          <div className="font-ubuntu">
        <h1 className="text-3xl font-bold text-green-800">
          Agregar Gasto Camión
        </h1>
        <h2 className="text-lg text-green-900">
          Registra tus gastos aquí
        </h2>
        </div>
    </div>



 {/* Formulario */}
    <div>
        <form 
        className="max-w-3xl mx-6 bg-[#EDFAF2] p-8 mt-6 rounded-lg shadow-md font-ubuntu border-slate-200 border-1"
         onSubmit={handleSubmit(handleAddGastoCamion)}>
            <h2 className="text-green-800 font-bold text-xl">Información del gasto</h2>
            <h3 className="text-green-700 mb-6">Completa los datos del gastos del camión</h3>
         
         {/* Manifiesto */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="descripcion"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Descripción
                   </label>
                   <input
                     id="descripcion"
                     type="text"
                     placeholder="Descripción"
                     className={`border-2 p-2 rounded-lg placeholder-slate-600 w-lg bg-white border-white`}
                     {...register("descripcion", {
                       required: "La descripción es obligatoria",
                     })}
                   />
                   {errors.descripcion && (
                     <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
                   )}
                  
                 </div>


                 {/* Valor */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="valor"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Valor
                   </label>
                   <input
                     id="valor"
                     type="number"
                     step="0.01"
                     placeholder="Valor"
                     className="bg-white border-white border-2 p-2 rounded-lg placeholder-slate-600 w-lg"
                     {...register("valor", {
                       required: "El valor es obligatorio",
                       valueAsNumber: true,
                     })}
                   />
                   {errors.valor && (
                     <ErrorMessage>{errors.valor.message}</ErrorMessage>
                   )}
                 </div>


    

                 {/* Tipo de Gasto */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="tipo_gasto"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Tipo de Gasto
                   </label>
                   <select
                     id="tipo_gasto"
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-white`}
                     {...register("tipo_gasto", {
                       required: "El tipo de gasto es obligatorio",
                       
                     })}
                   >
                     <option value="">Selecciona un tipo de gasto</option>
                     <option value="repuestos">Repuestos</option>
                     <option value="llantas">Llantas</option>
                     <option value="seguros">Seguros</option>
                     <option value="bateria">Batería</option>
                     <option value="nomina">Nomina</option>
                     <option value="lavadas">Lavadas</option>
                     <option value="peajes">Peajes</option>

                     <option value="otro">Otros</option>
                     
                    
                   </select>
                   {errors.tipo_gasto && (
                     <ErrorMessage>{errors.tipo_gasto.message}</ErrorMessage>
                   )}
                  
                 </div>


                 {/* Camion */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="id_camion"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Camion
                   </label>
                   <select
                     id="id_camion"
                     
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs  bg-white border-white
      `}
                     {...register("id_camion", {
                       required: "La placa del camion es obligatorio",
                       valueAsNumber: true,
                     })}
                   >
                     <option value="">Selecciona un camion</option>
                     {camionesData?.map((camion: {id_camion: number, placa: string}) => (
                       <option key={camion.id_camion} value={camion.id_camion}>{camion.placa} </option>
                     ))}
                    
                   </select>
                   {errors.id_camion && (
                     <ErrorMessage>{errors.id_camion.message}</ErrorMessage>
                   )}
                  
                 </div>

  

                 {/* Fecha  */}
                 <div className="grid grid-cols-1 space-y-3 mb-12">
                   <label
                     htmlFor="fecha"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Fecha 
                   </label>
                   <input
                     id="fecha"
                     type="date"
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-white`}
                     {...register("fecha", {
                       required: "La fecha es obligatoria",
                     })}
                   />
                   {errors.fecha && (
                     <ErrorMessage>{errors.fecha.message}</ErrorMessage>
                   )}
                   
                 </div>


                 <input
                  type="submit"
                  className="bg-green-900 p-1 text-lg w-xs  block text-white rounded-xs font-bold cursor-pointer hover:bg-green-600"
                  value={'Registrar Gasto Camión'}
                  />
        </form>
    </div>
   </>
  )
}
