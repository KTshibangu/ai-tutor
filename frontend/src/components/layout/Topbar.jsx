import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-8 py-4 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome Back
        </h2>

        <p className="text-gray-500">
          {
            user?.role === "Teacher" ? "Provide Study Materials" : "Ready to continue learning?"
          }
        </p>

      </div>

      <div className="flex items-center gap-6">

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