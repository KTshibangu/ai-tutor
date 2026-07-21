import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-4 md:px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={26} />
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Welcome Back
          </h2>

          <p className="text-sm md:text-base text-gray-500">
            {user?.role === "Teacher"
              ? "Provide Study Materials"
              : "Ready to continue learning?"}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-4 md:gap-6">

        <Bell className="cursor-pointer" />

        <Avatar>
          <AvatarFallback>
            {user?.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

      </div>

    </header>
  );
}