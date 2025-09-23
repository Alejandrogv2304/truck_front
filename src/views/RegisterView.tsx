import { Link } from "react-router-dom"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function RegisterView() {

    const[visible,setVisible]= useState(false);
  return (
    <div className="bg-green-50 shadow-lg rounded-lg font-ubuntu">
      <h2 className="text-center text-green-800 font-bold text-2xl pt-8">Truck App</h2>
      <h4 className="text-center  text-lg">Crea tu cuenta para empezar a administrar</h4>
      <form className="bg-green-50 px-5 py-10 rounded-lg space-y-5">
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-lg font-semibold text-green-800 pl-3">Nombre</label>
        <input  id="nombre"
            type="nombre"
            placeholder="Tú Nombre"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            >

            </input>
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-lg font-semibold text-green-800 pl-3">Apellido</label>
        <input  id="apellido"
            type="apellido"
            placeholder="Tú Apellido"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            >

            </input>
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-lg font-semibold text-green-800 pl-3">Correo Electrónico</label>
        <input  id="email"
            type="email"
            placeholder="tuemail@correo.com"
            className="bg-white border-none p-2 rounded-lg placeholder-slate-400 ml-2"
            >

            </input>
      </div>
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
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className=" text-gray-500 hover:text-gray-700"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>

       <input
        type="submit"
        className="bg-green-900 p-1 text-lg w-9/10 mx-auto block text-white rounded-lg font-bold cursor-pointer"
        value='Registrarme'
    />
      </form>
      <nav>
       <Link 
       to="/auth/login"
       className="text-center text-green-900 text-lg block -mt-8 pb-4 "
       >
       <span className="text-slate-600">¿Ya tienes cuenta? </span> <span className="hover:underline">Inicia Sesión</span>
       </Link>
    </nav>
    </div>
  )
}
