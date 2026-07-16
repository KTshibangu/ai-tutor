import { Link } from "react-router-dom";

export default function Navbar() {

    return (

        <nav className="bg-white border-b">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    AI Tutor
                </Link>

                <div className="space-x-4">

                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-lg hover:bg-gray-100"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </nav>

    );
}