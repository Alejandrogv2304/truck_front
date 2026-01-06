import { FaBars } from 'react-icons/fa'
import { IoMdLogOut } from "react-icons/io";
import type { SideBarProps } from './Sidebar';
import { COLORS } from '../constants/styles';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ sidebarToggle, setSidebarToggle }:SideBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token y el nombre del usuario del localStorage
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_NAME');
    
    // Redirigir al login
    navigate('/auth/login');
  };

  return (
    <nav className="flex justify-between py-3 px-4 border-b-2 border-gray-200 font-ubuntu">
      <div className="flex items-center text-xl">
        <FaBars className="text-black cursor-pointer me-4" onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className="text-black font-bold text-2xl">Truck App</span>
      </div>
      <div className="flex items-center gap-x-25">
       
        <div className="relative group">
          <div className="text-black cursor-pointer">
            <IoMdLogOut className="h-6 w-6 mt-1" />
          </div>
          <div className="z-10 bg-white hidden group-hover:block absolute rounded-lg shadow w-32 top-full right-0">
            <ul className="py-2 text-sm text-gray-950">
              <li className={`${COLORS["hoverdark"]}`}>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 "
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
