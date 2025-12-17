import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import type {  Conductor } from "../types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConductor, getConductorById, updateConductor } from "../api/TruckAppAPI";
import { useEffect } from "react";

export default function AddConductorView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    
    const isEditMode = Boolean(id);

    const initialValues:Conductor = {
        nombre: "",
        telefono: "",
        estado: "",
        identificacion: "",
        apellido: "",
        fecha_vinculacion: "",
      };

       const {
          register,
          reset,
          handleSubmit,
          formState: { errors },
        } = useForm<Conductor>({ defaultValues: initialValues });

    // Query para obtener datos del camión si estamos en modo edición
    const { data: conductorData } = useQuery({
      queryKey: ['conductor', id],
      queryFn: () => getConductorById(Number(id)),
      enabled: isEditMode, // Solo ejecuta si hay un id
    });

    // Cargar datos en el formulario cuando se obtienen
    useEffect(() => {
      if (conductorData) {
        reset({
          nombre: conductorData.nombre,
          apellido: conductorData.apellido,
          estado: conductorData.estado,
          identificacion: conductorData.identificacion,
          telefono: conductorData.telefono,
          fecha_vinculacion: conductorData.fecha_vinculacion,
        });
      }
    }, [conductorData, reset]);

    // Mutation para crear
    const createMutation = useMutation({
      mutationFn: createConductor,
      onError: (error) => {
        toast.error(error.message || 'Error al agregar el conductor');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Conductor agregado exitosamente');
        reset();
        queryClient.invalidateQueries({ queryKey: ['conductores'] });
        setTimeout(() => navigate('/admin/conductores'), 1500);
      }
    });

    // Mutation para actualizar
    const updateMutation = useMutation({
      mutationFn: updateConductor,
      onError: (error) => {
        toast.error(error.message || 'Error al actualizar el conductor');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Conductor actualizado exitosamente');
        queryClient.invalidateQueries({ queryKey: ['conductores'] });
        queryClient.invalidateQueries({ queryKey: ['conductor', id] });
        setTimeout(() => navigate('/admin/conductores'), 1500);
      }
    });

    const handleAddConductor = (formData: Conductor) => {
      if (isEditMode) {
        updateMutation.mutate({ id: Number(id), formData });
      } else {
        createMutation.mutate(formData);
      }
    };
  return (
    <>
    {/* Div de inicio */}
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/camiones" className="flex items-center ml-8 text-green-800">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
          <div className="font-ubuntu">
        <h1 className="text-3xl font-bold text-green-800">
          {isEditMode ? 'Editar Camión' : 'Agregar Camión'}
        </h1>
        <h2 className="text-lg text-green-900">
          {isEditMode ? 'Modifica los datos del camión' : 'Registra los camiones que te pertenecen'}
        </h2>
        </div>
    </div>

     {/* Formulario */}
    <div>
        <form 
        className="max-w-3xl mx-6 bg-[#EDFAF2] p-8 mt-6 rounded-lg shadow-md font-ubuntu border-slate-200 border-1"
         onSubmit={handleSubmit(handleAddConductor)}>
            <h2 className="text-green-800 font-bold text-xl">Información del conductor</h2>
            <h3 className="text-green-700 mb-6">Completa los datos del conductor</h3>
         
         {/* Modelo */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="nombre"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Nombre
                   </label>
                   <input
                     id="nombre"
                     type="text"
                     placeholder="Nombre"
                     className="bg-white border-white border-2 p-2 rounded-lg placeholder-slate-600 w-lg"
                     {...register("nombre", {
                       required: "El modelo es obligatorio",
                     })}
                   />
                   {errors.nombre && (
                     <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                   )}
                 </div>


                 {/* Apellido */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="apellido"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Apellido
                   </label>
                   <input
                     id="apellido"
                     type="text"
                     placeholder="Apellido"
                     className="bg-white border-white border-2 p-2 rounded-lg placeholder-slate-600 w-lg"
                     {...register("apellido", {
                       required: "El apellido es obligatorio",
                     })}
                   />
                   {errors.apellido && (
                     <ErrorMessage>{errors.apellido.message}</ErrorMessage>
                   )}
                 </div>


                  {/* Identificación */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="identificacion"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Número de Identificación
                   </label>
                   <input
                     id="identificacion"
                     type="text"
                     placeholder="Número de Identificación"
                     className="bg-white  border-white border-2 p-2 rounded-lg placeholder-slate-600 w-xs"
                     {...register("identificacion", {
                       required: "El apellido es obligatorio",
                     })}
                       />
                  
                   {errors.identificacion && (
                     <ErrorMessage>{errors.identificacion.message}</ErrorMessage>
                   )}
                 </div>

                  {/* Estado */}
                 <div className="grid grid-cols-1 space-y-3">
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

   {/* Telefono */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="telefono"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Teléfono
                   </label>
                   <input
                     id="telefono"
                     type="text"
                     placeholder="Teléfono"
                     className="bg-white border-white border-2 p-2 rounded-lg placeholder-slate-600 w-xs"
                     {...register("telefono", {
                       required: "El teléfono es obligatorio",
                       pattern: {
                       value: /^[3]\d{9}$/ ,
                       message: "El número de teléfono debe tener 10 dígitos y comenzar con 3",
                       },
                       validate: (value) => {
                         const trimmed = value.trim();
                         if (trimmed !== value) {
                           return "El número de teléfono no puede tener espacios";
                         }
                         return true;
                       }
                     })}
                   />
                   {errors.telefono && (
                     <ErrorMessage>{errors.telefono.message}</ErrorMessage>
                   )}
                 </div>

                 {/* Fecha de Vinculación */}
                 <div className="grid grid-cols-1 space-y-3 mb-12">
                   <label
                     htmlFor="fecha_vinculacion"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Fecha de Vinculación
                   </label>
                   <input
                     id="fecha_vinculacion"
                     type="date"
                     className="bg-white border-white border-2 p-2 rounded-lg text-slate-600 w-xs"
                     {...register("fecha_vinculacion", {
                       required: "La fecha de vinculación es obligatoria",
                     })}
                   />
                   {errors.fecha_vinculacion && (
                     <ErrorMessage>{errors.fecha_vinculacion.message}</ErrorMessage>
                   )}
                 </div>


                 <input
                  type="submit"
                  className="bg-green-900 p-1 text-lg w-xs  block text-white rounded-xs font-bold cursor-pointer hover:bg-green-600"
                  value={isEditMode ? 'Actualizar Conductor' : 'Registrar Conductor'}
                  />
        </form>
    </div>

    </>
  )
}
