import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { loginSchema } from "../validations/loginSchema";
import { login as loginRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    authenticated,
    user: currentUser,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Prevent logged-in users from seeing the login page
  if (authenticated) {
    return (
      <Navigate
        to={
          currentUser?.role === "Teacher"
            ? "/teacher"
            : "/student"
        }
        replace
      />
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const loginResponse = await loginRequest(
        data.username,
        data.password
      );

      login({
        username: loginResponse.username,
        role: loginResponse.role,
        token: loginResponse.access_token,
      });

      toast.success("Welcome back!");

      navigate(
        loginResponse.role === "Teacher"
          ? "/teacher"
          : "/student",
        { replace: true }
      );
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to continue learning
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Label>Username</Label>

              <Input
                {...register("username")}
                placeholder="Enter username"
              />

              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-2.5"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}