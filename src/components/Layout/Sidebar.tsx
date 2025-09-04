import { NavLink } from "react-router";
import { X } from "lucide-react";
import Logo from "../UI/Logo";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <>
      {/*  Desktop */}
      <aside className="hidden md:block w-1/6 bg-gray-200 p-4 px-2 ">
        <Logo />
        <nav className="flex flex-col gap-2 text-2xl">
          <NavLink
            to="/dashboard/zones"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2 rounded-lg ${
                isActive ? " bg-white shadow" : "bg-transparent"
              }`
            }
          >
            Zones
          </NavLink>
          <NavLink
            to="/dashboard/tickets"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Tickets
          </NavLink>
          <NavLink
            to="/dashboard/subscriptions"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Subscriptions
          </NavLink>
          <NavLink
            to="/dashboard/reports"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Reports
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/dashboard/rushHours"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Rush Hours Management
          </NavLink>
        </nav>
      </aside>

      {/*  Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <NavLink
            to="/dashboard"
            className="btn btn-ghost justify-start "
            onClick={() => setOpen(false)}
          >
            Zones
          </NavLink>
          <NavLink
            to="/dashboard/tickets"
            className="btn btn-ghost justify-start "
            onClick={() => setOpen(false)}
          >
            Tickets
          </NavLink>
          <NavLink
            to="/dashboard/subscriptions"
            className="btn btn-ghost justify-start "
            onClick={() => setOpen(false)}
          >
            Subscriptions
          </NavLink>
          <NavLink
            to="/dashboard/reports"
            className="btn btn-ghost justify-start "
            onClick={() => setOpen(false)}
          >
            Reports
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/dashboard/rushHours"
            className={({ isActive }: { isActive: boolean }) =>
              `btn btn-ghost justify-start mt-2  rounded-lg ${
                isActive ? " bg-white shadow" : ""
              }`
            }
          >
            Rush Hours Management
          </NavLink>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
