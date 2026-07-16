import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  ClipboardCheck,
  History,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout, user } = useAuth();

  const studentLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student",
    },
    {
      name: "Chat",
      icon: MessageSquare,
      path: "/student/chat",
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
    {
      name: "Documents",
      icon: FileText,
      path: "teacher/documents",
    },
  ];

  const links =
    user?.role === "Teacher"
      ? teacherLinks
      : studentLinks;

  return (
    <aside className="w-72 bg-white border-r flex flex-col">

      <div className="border-b p-6">

        <h1 className="text-3xl font-bold text-blue-600">
          AI Tutor
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          {user?.username}
        </p>

      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-4">

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-600 w-full rounded-xl px-4 py-3 hover:bg-red-50"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}