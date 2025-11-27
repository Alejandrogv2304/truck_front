import { COLORS } from '../constants/styles';
import { FaRegUserCircle  } from 'react-icons/fa';
import { IoClose } from "react-icons/io5"; // Icono de cerrar
import { LuHouse } from "react-icons/lu";
import { CiLocationOn,CiDeliveryTruck } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { Link } from 'react-router-dom';

 export type SideBarProps ={
    sidebarToggle: boolean,
    setSidebarToggle:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SideBar({ sidebarToggle, setSidebarToggle }:SideBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64  text-black transform ${
        sidebarToggle ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out shadow-xl z-50 font-ubuntu ${COLORS["light_primary"]}`}
    >
      {/* Botón de cerrar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-black">Tablero Administrador</h1>
        <IoClose 
          className="text-black text-2xl cursor-pointer" 
          onClick={() => setSidebarToggle(false)}
        />
      </div>
      <hr />
      <div className="flex flex-col justify-between h-[calc(100%-80px)]">
      <ul className="text-green-900 font-bold mt-3 ml-2 mr-2">
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="" className="px-3 w-full flex items-center">
            <LuHouse className="h-6 w-6 inline-block mr-2 -mt-2" /> Tablero
          </Link>
        </li>
           <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="" className="px-3 w-full flex items-center">
            <CiLocationOn className="h-6 w-6 inline-block mr-2 -mt-2" /> Viajes
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="" className="px-3 w-full flex items-center">
            <BsCurrencyDollar className="h-6 w-6 inline-block mr-2 -mt-2" /> Gastos
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/admin/conductores" className="px-3 w-full flex items-center">
            <GoPeople className="h-6 w-6 inline-block mr-2 -mt-2" /> Conductores
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="/admin/camiones" className="px-3 w-full flex items-center">
            <CiDeliveryTruck className="h-6 w-6 inline-block mr-2 -mt-2" /> Camiones
          </Link>
        </li>
        <li className={`mb-2 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
          <Link to="" className="px-3 w-full flex items-center">
            <TiDocumentText className="h-6 w-6 inline-block mr-2 -mt-2" /> Informes
          </Link>
        </li>
      </ul>
      <ul>
      <li className={`mb-4 rounded hover:shadow py-2 ${COLORS["hover"]}`}>
        <Link to="" className="px-3 w-full flex items-center">
          <FaRegUserCircle className="h-6 w-6 inline-block mr-2 -mt-2" /> Perfil
        </Link>
      </li>
    </ul>
      </div>
    </div>
  );
}
