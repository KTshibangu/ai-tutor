import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashboardLayout from "@/layouts/DashboardLayout";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import NotFound from "../pages/NotFound";
import Chat from "../pages/Chat";
import Quiz from "../pages/Quiz";
import History from "../pages/History";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {

    return (
        <Routes>

            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
                path="/teacher"
                element={
                    <ProtectedRoute role="Teacher">
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<TeacherDashboard />} />
            </Route>

            <Route
                path="/student"
                element={
                    <ProtectedRoute role="Student">
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<StudentDashboard />} />
                <Route path="chat" element={<Chat />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="history" element={<History />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}