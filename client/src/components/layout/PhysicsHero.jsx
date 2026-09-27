import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
export default function PhysicsHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = e.currentTarget?.getBoundingClientRect()
            if (rect) {
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                })
            }
        }

        const heroElement = document.getElementById("physics-hero")
        if (heroElement) {
            heroElement.addEventListener("mousemove", handleMouseMove)
            return () => heroElement.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const particles = Array.from({ length: 40 }, (_, i) => (
        <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/50"
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${6 + Math.random() * 4}s`
            }}
        />
    ))
    const formulas = ["E = mc²", "F = ma", "v = λf", "P = mv", "W = Fd", "Q = mcΔT"]

    return (
        <div
            id="physics-hero"
            className="relative h-screen w-full bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"
                    style={{
                        left: `${20 + mousePosition.x * 0.1}%`,
                        top: `${10 + mousePosition.y * 0.1}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                />
                <div
                    className="absolute w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse"
                    style={{
                        right: `${10 + mousePosition.x * 0.05}%`,
                        bottom: `${20 + mousePosition.y * 0.05}%`,
                        transform: "translate(50%, 50%)",
                        animationDelay: "1s"
                    }}
                />

                {/* Simple Static Particles */}
                {particles}

                {/* Floating Formulas */}
                {formulas.map((formula, index) => (
                    <div
                        key={formula}
                        className="absolute text-white/20 font-mono text-sm animate-bounce"
                        style={{
                            left: `${15 + index * 15}%`,
                            top: `${20 + index * 10}%`,
                            animationDelay: `${index * 0.5}s`,
                            animationDuration: `${3 + index * 0.5}s`
                        }}
                    >
                        {formula}
                    </div>
                ))}
            </div>

            {/* Orbital Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                    {/* Orbit Ring 1 */}
                    <div
                        className="absolute w-40 h-40 border-2 border-cyan-400/60 rounded-full animate-spin"
                        style={{ animationDuration: "20s", left: "-80px", top: "-80px" }}
                    >
                        <div
                            className="absolute w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/70"
                            style={{ top: "-6px", left: "50%", transform: "translateX(-50%)" }}
                        />
                    </div>

                    {/* Orbit Ring 2 */}
                    <div
                        className="absolute w-60 h-60 border-2 border-purple-400/40 rounded-full animate-spin"
                        style={{
                            animationDuration: "30s",
                            animationDirection: "reverse",
                            left: "-120px",
                            top: "-120px"
                        }}
                    >
                        <div
                            className="absolute w-2 h-2 bg-purple-300 rounded-full shadow-lg shadow-purple-300/70"
                            style={{ top: "-4px", left: "50%", transform: "translateX(-50%)" }}
                        />
                    </div>

                    {/* Orbit Ring 3 */}
                    <div
                        className="absolute w-80 h-80 border-2 border-blue-400/30 rounded-full animate-spin"
                        style={{ animationDuration: "40s", left: "-160px", top: "-160px" }}
                    >
                        <div
                            className="absolute w-2 h-2 bg-blue-300 rounded-full shadow-lg shadow-blue-300/70"
                            style={{ top: "-4px", left: "50%", transform: "translateX(-50%)" }}
                        />
                    </div>

                    {/* Central Sun/Nucleus */}
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse shadow-lg shadow-yellow-300/80 relative z-10" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center h-screen px-8 lg:px-12">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                            Koinot qonunlarini o'rganing, bilimlaringizni sinang.
                        </span>
                        <br />
                        {/*<span className="text-white/90">Unleashed</span>*/}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Fizikaning asosiy tushunchalaridan boshlab murakkab mavzulargacha — hammasi bir joyda.
                        Interaktiv darslar va testlar orqali bilim va amaliyotingizni yanada mustahkamlang.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg shadow-cyan-400/40 transform hover:scale-105 transition-all duration-300"
                        >
                            <Link to={"/gradelist"}>O'rganishni boshlash</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300 bg-transparent"
                        >
                            <Link to={"/guide"}>Demoni ko'rish</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                        fill="url(#waveGradient)"
                        className="animate-pulse"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
                            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
                            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    )
}
