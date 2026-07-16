import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { signupStudent, signupTeacher } from "../api/auth";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email"),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string(),
    role: z.string(),
    grade: z.string().optional(),
    school: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "Student",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (role === "Student") {
        await signupStudent({
          fullName: data.fullName,
          email: data.email,
          username: data.username,
          password: data.password,
          grade: Number(data.grade),
          school: data.school,
        });
      } else {
        await signupTeacher({
          fullName: data.fullName,
          email: data.email,
          username: data.username,
          password: data.password,
        });
      }

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Join AI Tutor today.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label>Role</Label>

              <Select
                defaultValue="Student"
                onValueChange={(value) => {
                  setRole(value);
                  setValue("role", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Student">
                    Student
                  </SelectItem>

                  <SelectItem value="Teacher">
                    Teacher
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Full Name</Label>
              <Input {...register("fullName")} />
              <p className="text-red-500 text-sm">
                {errors.fullName?.message}
              </p>
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("email")} />
              <p className="text-red-500 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <Label>Username</Label>
              <Input {...register("username")} />
              <p className="text-red-500 text-sm">
                {errors.username?.message}
              </p>
            </div>

            {role === "Student" && (
              <>
                <div>
                  <Label>Grade</Label>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    {...register("grade")}
                  />
                </div>

                <div>
                  <Label>School</Label>
                  <Input {...register("school")} />
                </div>
              </>
            )}

            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="text-red-500 text-sm">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <Label>Confirm Password</Label>

              <Input
                type="password"
                {...register("confirmPassword")}
              />

              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-center text-sm">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
