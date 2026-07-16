import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import LandingPageImg from '../assets/landing-page.jpg';
import Feature from "../components/Feature";

export default function Landing() {
    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <section className="max-w-7xl mx-auto px-8 py-20">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-6xl font-extrabold leading-tight"
                        >
                            Learn Smarter
                            <br />
                            with AI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 text-xl text-gray-600"
                        >
                            Upload your study material,
                            chat with AI,
                            generate quizzes,
                            and master every subject.
                        </motion.p>

                        <div className="mt-10 flex gap-5">

                            <Link
                                to="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="border px-6 py-3 rounded-xl"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                    >

                        <img
                            src={LandingPageImg}
                            alt="AI Tutor"
                            className="rounded-3xl shadow-xl"
                        />

                    </motion.div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto py-24">

                <h2 className="text-4xl font-bold text-center mb-16">
                    Everything You Need
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <Feature
                        emoji="📚"
                        title="Upload PDFs"
                        description="Teachers upload textbooks and notes."
                    />

                    <Feature
                        emoji="💬"
                        title="AI Chat"
                        description="Ask questions directly from your documents."
                    />

                    <Feature
                        emoji="📝"
                        title="Generate Quizzes"
                        description="Create quizzes instantly."
                    />

                    <Feature
                        emoji="📈"
                        title="Track Progress"
                        description="View quiz history and performance."
                    />

                </div>

            </section>

        </div>
    );
}