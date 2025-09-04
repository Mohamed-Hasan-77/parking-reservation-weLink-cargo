import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useUserStore";
import Logo from "../UI/Logo";

export default function Layout() {
  const [open, setOpen] = useState(false);
 const { user, clearAuth  } = useAuthStore();


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {user?.role === "admin" &&
      <Sidebar open={open} setOpen={setOpen} />
      }

      {/* Main Content */}
      <main className="flex-1 bg-base-200 ">
        <nav className=" mb-6 md:relative fixed top-0 left-0 right-0 bg-base-100 p-4 shadow z-30">
          <div className="container mx-auto flex justify-between items-center">
            {/* Menu Mobile*/}
              {user?.role === "admin" &&
                <button className="md:hidden btn btn-ghost "onClick={() => setOpen(true)} > <Menu className="w-6 h-6" /></button>
              }
              <Logo/>
            <div className="user flex items-center ">
                <div className=" flex items-center mr-5 p-2 bg-gray-100 shadow rounded-lg">
                    <User className="inline-block w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600" />
                    <span className=" text-sm md:text-lg font-medium ">{user?.username}</span>
                </div>
                <button className="btn btn-error p-2  shadow rounded-lg text-white" onClick={clearAuth}>
                    Logout
                </button>
            </div>
          </div>
       
        </nav>
        <div className="container mx-auto mt-10 rounded-lg">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
