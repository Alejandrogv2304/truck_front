import { Link, useNavigate } from "react-router-dom"
import type { LoginForm } from "../types"
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";
export default function LoginView() {
    const navigate = useNavigate(); 
  const initialValues: LoginForm = {
    correo: '',
    password:''
  }
  const { register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues});
 
  const handleLogin = async(formData: LoginForm) =>{
    try{
     
      const {data} = await api.post(`/api/v1/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data.access_token)
      localStorage.setItem('USER_NAME', data.admin.nombres)

      navigate('/admin/dashboard')
       
    }catch(error){
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div className="bg-green-50 shadow-lg rounded-lg font-ubuntu">
      <h2 className="text-center text-green-800 font-bold text-2xl pt-8">Truck App</h2>
      <h4 className="text-center  text-lg">Ingresa tú cuenta para iniciar</h4>
      <form 
      className="bg-green-50 px-5 py-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleLogin)}
      noValidate>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-lg font-semibold text-green-800 pl-3">Correo Electrónico</label>
        <input  id="email"
            type="email"
            placeholder="tuemail@correo.com"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            {...register("correo", {
                required: "El Email es obligatorio",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
            })}
            >

            </input>
            {errors.correo && (
            <ErrorMessage>{errors.correo.message}</ErrorMessage>
        )}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-lg font-semibold text-green-800 pl-3">Password</label>
        <input  id="password"
            type="password"
            placeholder="*******"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            {...register("password", {
                required: "El Password es obligatorio",
            })}
            >

            </input>
            {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

       <input
        type="submit"
        className="bg-green-900 p-1 text-lg w-9/10 mx-auto block text-white rounded-lg font-bold cursor-pointer"
        value='Iniciar Sesión'
    />
      </form>
      <nav>
       <Link 
       to="/auth/register"
       className="text-center text-green-900 text-lg block -mt-8 pb-4 "
       >
       <span className="text-slate-600">¿No tienes cuenta?</span> <span className="hover:underline">Registrate</span>
       </Link>
    </nav>
    </div>
  )
}
