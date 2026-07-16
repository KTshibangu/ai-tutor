import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
    register,
    error
}) {

    const [show, setShow] = useState(false);

    return (

        <div className="space-y-2">

            <label>Password</label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    {...register("password")}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3"
                >
                    {show ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>

            </div>

            {error && (
                <p className="text-red-500 text-sm">
                    {error.message}
                </p>
            )}

        </div>

    );
}