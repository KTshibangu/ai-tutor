import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

            <h1 className="text-2xl font-bold mb-8">
                AI Tutor
            </h1>

            <nav className="space-y-3">

                <NavLink to="." end>
                    Dashboard
                </NavLink>

                <br />

                <NavLink to="chat">
                    Chat
                </NavLink>

                <br />

                <NavLink to="quiz">
                    Quiz
                </NavLink>

                <br />

                <NavLink to="history">
                    History
                </NavLink>

            </nav>

            <button
                onClick={logout}
                className="mt-10 bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>

        </aside>
    );
}