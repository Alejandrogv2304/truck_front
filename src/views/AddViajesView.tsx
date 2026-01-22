import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import type {  Viaje } from "../types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  createViaje, getAllCamionPlacaAndId, getAllConductoresNameAndId, getViajeById, updateViaje } from "../api/TruckAppAPI";
import { useEffect } from "react";

export default function AddViajesView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    
    const isEditMode = Boolean(id);

    const initialValues:Viaje = {
       lugar_origen:"",
       lugar_destino:"",
       fecha_inicio:"",
       valor:0,
       num_manifiesto:"",
       idCamion:1,
       idConductor:1,
       estado:"",
      };

       const {
          register,
          reset,
          handleSubmit,
          formState: { errors },
        } = useForm<Viaje>({ defaultValues: initialValues });

    // Query para obtener datos del viaje si estamos en modo edición
    const { data: viajeData } = useQuery({
      queryKey: ['viaje', id],
      queryFn: () => getViajeById(Number(id)),
      enabled: isEditMode, // Solo ejecuta si hay un id
    });
    
    // Query para obtener los conductores 
    const { data: conductorData } = useQuery({
      queryKey: ['conductornombre'],
      queryFn: () => getAllConductoresNameAndId(),
      enabled: true,
    });

    // Query para obtener los camiones 
    const { data: camionesData } = useQuery({
      queryKey: ['camionesPlaca'],
      queryFn: () => getAllCamionPlacaAndId(),
      enabled: true,
    });

    // Cargar datos en el formulario cuando se obtienen
    useEffect(() => {
      if (isEditMode && viajeData && camionesData && conductorData) {
        // Buscar el ID del camión por placa
        const camionEncontrado = camionesData.find(
          (c: {id_camion: number, placa: string}) => c.placa === viajeData.camion
        );
        
        // Buscar el ID del conductor por nombre
        const conductorEncontrado = conductorData.find(
          (c: {id_conductor: number, nombre: string}) => c.nombre === viajeData.conductor
        );
        
        // Formatear la fecha si es necesario
        let fechaFormatted = viajeData.fecha_inicio;
        if (fechaFormatted && fechaFormatted.includes('T')) {
          fechaFormatted = fechaFormatted.split('T')[0];
        }
        
        reset({
         lugar_origen: viajeData.lugar_origen || '',
         lugar_destino: viajeData.lugar_destino || '',
         fecha_inicio: fechaFormatted || '',
         valor: parseFloat(viajeData.valor) || 0,
         num_manifiesto: viajeData.num_manifiesto || '',
         idCamion: camionEncontrado?.id_camion || 1,
         idConductor: conductorEncontrado?.id_conductor || 1,
         estado: viajeData.estado || '',
        });
      }
    }, [viajeData, camionesData, conductorData, reset, isEditMode]);

    // Mutation para crear
    const createMutation = useMutation({
      mutationFn: createViaje,
      onError: (error) => {
        toast.error(error.message || 'Error al crear el viaje');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Viaje creado exitosamente');
        reset();
        queryClient.invalidateQueries({ queryKey: ['viajes'] });
        setTimeout(() => navigate('/admin/viajes'), 1500);
      }
    });

    // Mutation para actualizar
    const updateMutation = useMutation({
      mutationFn: updateViaje,
      onError: (error) => {
        toast.error(error.message || 'Error al actualizar el viaje');
      },
      onSuccess: (data) => {
        toast.success(data?.message || 'Viaje actualizado exitosamente');
        queryClient.invalidateQueries({ queryKey: ['viajes'] });
        queryClient.invalidateQueries({ queryKey: ['viaje', id] });
        setTimeout(() => navigate('/admin/viajes'), 1500);
      }
    });

    const handleAddViaje = (formData: Viaje) => {
      
      
      // Transformar los datos para asegurar que sean números enteros válidos
      const idCamion = parseInt(String(formData.idCamion), 10);
      const idConductor = parseInt(String(formData.idConductor), 10);
      const valor = parseFloat(String(formData.valor));

      // Validar que las conversiones sean exitosas
      if (isNaN(idCamion) || idCamion <= 0) {
        toast.error('Debe seleccionar un camión válido');
        return;
      }

      if (isNaN(idConductor) || idConductor <= 0) {
        toast.error('Debe seleccionar un conductor válido');
        return;
      }

      if (isNaN(valor) || valor < 0) {
        toast.error('El valor debe ser un número válido');
        return;
      }

      if (isEditMode) {
        // En modo edición, enviar solo los campos permitidos
        const dataToUpdate = {
          lugar_origen: formData.lugar_origen,
          lugar_destino: formData.lugar_destino,
          valor: valor,
          estado: formData.estado,
        };
        
        
        updateMutation.mutate({ id: Number(id), formData: dataToUpdate as Viaje });
      } else {
        // En modo creación, enviar todos los campos
        const dataToSend = {
          lugar_origen: formData.lugar_origen,
          lugar_destino: formData.lugar_destino,
          fecha_inicio: formData.fecha_inicio,
          valor: valor,
          num_manifiesto: formData.num_manifiesto,
          idCamion: idCamion,
          idConductor: idConductor,
          estado: formData.estado,
        };
        
      
        createMutation.mutate(dataToSend);
      }
    };

    
  return (
    <>
    {/* Div de inicio */}
    <div className="flex items-center gap-6 mt-6">
        <Link to="/admin/viajes" className="flex items-center ml-8 text-green-800">
            <FaArrowLeft className="h-6 w-6" /> 
          </Link>
          <div className="font-ubuntu">
        <h1 className="text-3xl font-bold text-green-800">
          {isEditMode ? 'Editar Viaje' : 'Agregar Viaje'}
        </h1>
        <h2 className="text-lg text-green-900">
          {isEditMode ? 'Modifica los datos del viaje' : 'Registra tus viajes aquí'}
        </h2>
        </div>
    </div>

     {/* Formulario */}
    <div>
        <form 
        className="max-w-3xl mx-6 bg-[#EDFAF2] p-8 mt-6 rounded-lg shadow-md font-ubuntu border-slate-200 border-1"
         onSubmit={handleSubmit(handleAddViaje)}>
            <h2 className="text-green-800 font-bold text-xl">Información del viaje</h2>
            <h3 className="text-green-700 mb-6">Completa los datos del viaje</h3>
         
         {/* Manifiesto */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="num_manifiesto"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Manifiesto
                   </label>
                   <input
                     id="num_manifiesto"
                     type="text"
                     placeholder="Manifiesto"
                     disabled={isEditMode}
                     className={`border-2 p-2 rounded-lg placeholder-slate-600 w-lg ${
                       isEditMode ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border-white'
                     }`}
                     {...register("num_manifiesto", {
                       required: "El manifiesto es obligatorio",
                     })}
                   />
                   {errors.num_manifiesto && (
                     <ErrorMessage>{errors.num_manifiesto.message}</ErrorMessage>
                   )}
                   {isEditMode && (
                     <p className="text-sm text-gray-600 font-semibold">Este campo no se puede modificar</p>
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


                  {/* Lugar de origen */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="lugar_origen"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Lugar de Origen
                   </label>
                   <input
                     id="lugar_origen"
                     type="text"
                     placeholder="Lugar de Origen"
                     className="bg-white  border-white border-2 p-2 rounded-lg placeholder-slate-600 w-xs"
                     {...register("lugar_origen", {
                       required: "El lugar de origen es obligatorio",
                     })}
                       />
                  
                   {errors.lugar_origen && (
                     <ErrorMessage>{errors.lugar_origen.message}</ErrorMessage>
                   )}
                 </div>



                  {/* Lugar de destino */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="lugar_destino"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Lugar de Destino
                   </label>
                   <input
                     id="lugar_destino"
                     type="text"
                     placeholder="Lugar de Destino"
                     className="bg-white  border-white border-2 p-2 rounded-lg placeholder-slate-600 w-xs"
                     {...register("lugar_destino", {
                       required: "El lugar de destino es obligatorio",
                     })}
                       />
                  
                   {errors.lugar_destino && (
                     <ErrorMessage>{errors.lugar_destino.message}</ErrorMessage>
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





                 {/* Conductor */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="idConductor"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Conductor
                   </label>
                   <select
                     id="idConductor"
                     disabled={isEditMode}
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs ${
                       isEditMode ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border-white'
                     }`}
                     {...register("idConductor", {
                       required: "El conductor es obligatorio",
                       valueAsNumber: true,
                     })}
                   >
                     <option value="">Selecciona un conductor</option>
                     {conductorData?.map((conductor: {id_conductor: number, nombre: string, apellido:string}) => (
                       <option key={conductor.id_conductor} value={conductor.id_conductor}>{conductor.nombre} {conductor.apellido}</option>
                     ))}
                    
                   </select>
                   {errors.idConductor && (
                     <ErrorMessage>{errors.idConductor.message}</ErrorMessage>
                   )}
                   {isEditMode && (
                     <p className="text-sm text-gray-600 font-semibold">Este campo no se puede modificar</p>
                   )}
                 </div>


                 {/* Camion */}
                 <div className="grid grid-cols-1 space-y-3">
                   <label
                     htmlFor="idCamion"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Camion
                   </label>
                   <select
                     id="idCamion"
                     disabled={isEditMode}
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs ${
                       isEditMode ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border-white'
                     }`}
                     {...register("idCamion", {
                       required: "El camion es obligatorio",
                       valueAsNumber: true,
                     })}
                   >
                     <option value="">Selecciona un camion</option>
                     {camionesData?.map((camion: {id_camion: number, placa: string}) => (
                       <option key={camion.id_camion} value={camion.id_camion}>{camion.placa} </option>
                     ))}
                    
                   </select>
                   {errors.idCamion && (
                     <ErrorMessage>{errors.idCamion.message}</ErrorMessage>
                   )}
                   {isEditMode && (
                     <p className="text-sm text-gray-600 font-semibold">Este campo no se puede modificar</p>
                   )}
                 </div>

  

                 {/* Fecha de Inicio */}
                 <div className="grid grid-cols-1 space-y-3 mb-12">
                   <label
                     htmlFor="fecha_inicio"
                     className="text-lg font-semibold text-green-800 pl-3"
                   >
                     Fecha de Inicio
                   </label>
                   <input
                     id="fecha_inicio"
                     type="date"
                     disabled={isEditMode}
                     className={`border-2 p-2 rounded-lg text-slate-600 w-xs ${
                       isEditMode ? 'bg-gray-200 cursor-not-allowed' : 'bg-white border-white'
                     }`}
                     {...register("fecha_inicio", {
                       required: "La fecha de inicio es obligatoria",
                     })}
                   />
                   {errors.fecha_inicio && (
                     <ErrorMessage>{errors.fecha_inicio.message}</ErrorMessage>
                   )}
                   {isEditMode && (
                     <p className="text-sm text-gray-600 font-semibold">Este campo no se puede modificar</p>
                   )}
                 </div>


                 <input
                  type="submit"
                  className="bg-green-900 p-1 text-lg w-xs  block text-white rounded-xs font-bold cursor-pointer hover:bg-green-600"
                  value={isEditMode ? 'Actualizar Viaje' : 'Registrar Viaje'}
                  />
        </form>
    </div>

    </>
  )
}
