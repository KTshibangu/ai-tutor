import {
  LayoutDashboard,
  ClipboardCheck,
  History,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const { logout, user } = useAuth();

  const studentLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student",
    },
    {
      name: "Quiz",
      icon: ClipboardCheck,
      path: "/student/quiz",
    },
    {
      name: "History",
      icon: History,
      path: "/student/history",
    },
  ];

  const teacherLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/teacher",
    },
  ];

  const links =
    user?.role === "Teacher"
      ? teacherLinks
      : studentLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white border-r
          flex flex-col
          transition-transform duration-300 ease-in-out

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:static
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* Logo */}
        <div className="border-b p-6">
          <h1 className="text-3xl font-bold text-blue-600">
            AI Tutor
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {user?.username}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}