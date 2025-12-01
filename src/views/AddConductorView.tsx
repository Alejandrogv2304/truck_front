import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import type {  Conductor } from "../types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConductor, getCamionById, getConductorById, updateCamion, updateConductor } from "../api/TruckAppAPI";
import { useEffect } from "react";

export default function AddCondcutorView() {
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
        queryClient.invalidateQueries({ queryKey: ['condcutores'] });
        setTimeout(() => navigate('/admin/conductores'), 1500);
      }
    });

    // Mutation para actualizar
    const updateMutation = useMutation({
      mutationFn: updateConductor,
      onError: (error) => {
        toast.error(error.message || 'Error al actualizar el condcutor');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Condcutor actualizado exitosamente');
        queryClient.invalidateQueries({ queryKey: ['conductores'] });
        queryClient.invalidateQueries({ queryKey: ['condcutor', id] });
        setTimeout(() => navigate('/admin/camiones'), 1500);
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
                  value={isEditMode ? 'Actualizar Camión' : 'Registrar Camión'}
                  />
        </form>
    </div>

    </>
  )
}
