import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { RegisterForm } from "../types";
import { useForm } from "react-hook-form";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterView() {
  const [visible, setVisible] = useState(false);

  const initialValues: RegisterForm = {
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });

  // const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/api/v1/admin`, formData);
      // console.log(data);
      toast.success(data.message || 'Registro Exitoso');
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="bg-green-50 shadow-lg rounded-lg font-ubuntu">
      <h2 className="text-center text-green-800 font-bold text-2xl pt-8">
        Truck App
      </h2>
      <h4 className="text-center text-lg">
        Crea tu cuenta para empezar a administrar
      </h4>

      <form
        className="bg-green-50 px-5 py-10 rounded-lg space-y-5"
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* Nombre */}
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
            placeholder="Tu Nombre"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            {...register("nombre", {
              required: "El nombre es obligatorio",
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
            placeholder="Tu Apellido"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            {...register("apellido", {
              required: "El apellido es obligatorio",
            })}
          />
          {errors.apellido && (
            <ErrorMessage>{errors.apellido.message}</ErrorMessage>
          )}
        </div>

        {/* Correo */}
        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="correo"
            className="text-lg font-semibold text-green-800 pl-3"
          >
            Correo Electrónico
          </label>
          <input
            id="correo"
            type="email"
            placeholder="tuemail@correo.com"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            {...register("correo", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.correo && (
            <ErrorMessage>{errors.correo.message}</ErrorMessage>
          )}
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password"
            className="text-lg font-semibold text-green-800 pl-3"
          >
            Password
          </label>

          <div className="flex items-center bg-white rounded-lg p-2">
            <input
              id="password"
              type={visible ? "text" : "password"}
              placeholder="*******"
              className="flex-1 bg-transparent border-none outline-none placeholder-slate-400"
              {...register("password", {
                required: "El password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El password debe ser de mínimo 8 caracteres",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-gray-500 hover:text-gray-700"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

       
        {/* Botón */}
        <input
          type="submit"
          className="bg-green-900 p-1 text-lg w-9/10 mx-auto block text-white rounded-lg font-bold cursor-pointer"
          value="Registrarme"
        />
      </form>

      {/* Navegación */}
      <nav>
        <Link
          to="/auth/login"
          className="text-center text-green-900 text-lg block -mt-8 pb-4"
        >
          <span className="text-slate-600">¿Ya tienes cuenta? </span>
          <span className="hover:underline">Inicia Sesión</span>
        </Link>
      </nav>
    </div>
  );
}
