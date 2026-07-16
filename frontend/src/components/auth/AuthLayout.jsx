import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Left Side */}
            <div className="hidden lg:flex flex-1 bg-blue-600 text-white items-center justify-center p-16">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl font-bold">
                        AI Tutor
                    </h1>

                    <p className="mt-6 text-xl opacity-90">
                        Learn smarter using AI-powered tutoring,
                        document understanding,
                        and personalized quizzes.
                    </p>
                </motion.div>

            </div>

            {/* Right Side */}

            <div className="flex-1 flex justify-center items-center p-8">

                {children}

            </div>

        </div>
    );
}