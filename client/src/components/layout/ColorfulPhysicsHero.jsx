import { ArrowRight, Atom, BookOpen, PlayCircle, Trophy } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

const particles = [
    "left-[4%] top-[7%] h-1.5 w-1.5 [animation-delay:0ms]",
    "left-[10%] top-[4%] h-2 w-2 [animation-delay:180ms]",
    "left-[18%] top-[22%] h-1 w-1 [animation-delay:360ms]",
    "left-[29%] top-[78%] h-1.5 w-1.5 [animation-delay:540ms]",
    "left-[42%] top-[11%] h-1.5 w-1.5 [animation-delay:720ms]",
    "left-[55%] top-[84%] h-2 w-2 [animation-delay:900ms]",
    "left-[67%] top-[18%] h-2 w-2 [animation-delay:1080ms]",
    "left-[80%] top-[9%] h-1.5 w-1.5 [animation-delay:1260ms]",
    "left-[92%] top-[36%] h-1 w-1 [animation-delay:1440ms]",
    "left-[86%] top-[76%] h-1.5 w-1.5 [animation-delay:1620ms]"
]

export default function ColorfulPhysicsHero() {
    return (
        <section className="relative isolate min-h-[calc(100vh-1px)] overflow-hidden bg-gradient-to-b from-blue-700 to-purple-700  px-4 py-10 text-white sm:px-6 lg:px-8">
            {/* <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_15%,rgba(34,211,238,0.48),transparent_24%),radial-gradient(circle_at_86%_72%,rgba(59,130,246,0.55),transparent_26%),radial-gradient(circle_at_52%_42%,rgba(168,85,247,0.48),transparent_36%)]" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(37,99,235,0.72)_0%,rgba(124,58,237,0.76)_48%,rgba(192,38,211,0.72)_100%)]" /> */}

            {particles.map((particle) => (
                <span
                    key={particle}
                    className={`hero-color-particle absolute rounded-full bg-cyan-200/90 shadow-[0_0_14px_rgba(103,232,249,0.75)] ${particle}`}
                />
            ))}

            <div className="mx-auto grid min-h-[calc(100vh-15rem)] w-full max-w-7xl items-center gap-12 pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:pt-0">
                <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 ">
                        <Atom className="h-4 w-4" />
                        Fizika360
                    </div>

                    <h1 className="text-4xl font-black leading-[1.03] tracking-normal sm:text-6xl xl:text-7xl">
                        <span className="block text-cyan-200">Koinot qonunlarini</span>
                        <span className="block text-white">{"o'rganing va sinang."}</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/84 sm:text-xl">
                        {"Interaktiv darslar, testlar va tezkor natijalar - hammasi bir joyda."}
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 text-sm font-bold text-white  transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Link to="/gradelist">
                                <BookOpen className="h-4 w-4" />
                                {"O'rganishni boshlash"}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-full border-white/30 bg-white/10 px-8 text-sm font-bold text-white  transition-all duration-300 hover:-translate-y-0.5 "
                        >
                            <Link to="/guide">
                                <PlayCircle className="h-4 w-4" />
                                {"Demoni ko'rish"}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative z-10 mx-auto aspect-square w-full max-w-[540px] animate-in fade-in slide-in-from-bottom-6 duration-1000 sm:max-w-[620px] lg:mr-0">
                    <div className="absolute inset-0 rounded-[2rem] border border-white/18 bg-gradient-to-br from-cyan-300/14 via-purple-300/10 to-fuchsia-300/16 " />
                    {/* <div className="absolute inset-8 rounded-full border border-cyan-100/22" />
                    <div className="absolute inset-20 rounded-full border border-white/18" />
                    <div className="absolute inset-32 rounded-full border border-purple-200/24" /> */}

                    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 shadow-[0_0_56px_rgba(251,146,60,0.48)] sm:h-32 sm:w-32">
                        <div className="absolute inset-5 rounded-full bg-white/18" />
                    </div>

                    <div className="hero-color-orbit absolute inset-[12%] rounded-full border border-dashed border-white/24">
                        <span className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.7)]" />
                    </div>

                    <div className="hero-color-orbit-reverse absolute inset-[23%] rounded-full border border-dashed   border-white/24">
                        <span className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 shadow-[0_12px_28px_rgba(37,99,235,0.34)]" />
                    </div>

                    <div className="hero-color-orbit-slow absolute inset-[5%] rounded-full border border-dashed border-white/24">
                        <span className="absolute right-[14%] top-[10%] h-7 w-7 rounded-full bg-gradient-to-br from-purple-300 to-fuchsia-500 shadow-[0_12px_28px_rgba(217,70,239,0.32)]" />
                    </div>

                    {/* <div className="hero-card-float absolute left-2 top-8 rounded-xl border border-white/20 bg-white/12 px-5 py-4 backdrop-blur-sm sm:left-6">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">Test</p>
                        <div className="mt-3 h-2 w-40 rounded-full bg-white/18">
                            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
                        </div>
                    </div>

                    <div className="hero-card-float-delayed absolute bottom-10 right-2 rounded-xl border border-white/20 bg-white/12 px-5 py-4 backdrop-blur-sm sm:right-8">
                        <div className="flex items-center gap-3">
                            <Trophy className="h-5 w-5 text-yellow-200" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-100">Natija</p>
                                <p className="text-2xl font-black">100%</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-10 hidden rounded-lg border border-white/18 bg-white/10 px-4 py-3 font-mono text-sm font-semibold text-cyan-100 backdrop-blur-sm sm:block">
                        E = mc^2
                    </div> */}
                </div>
            </div>

            <style>{`
                @keyframes hero-color-particle {
                    0%, 100% { transform: translate3d(0, 0, 0); opacity: .62; }
                    50% { transform: translate3d(8px, -14px, 0); opacity: 1; }
                }

                @keyframes hero-float-card {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -10px, 0); }
                }

                .hero-color-particle {
                    animation: hero-color-particle 6s ease-in-out infinite;
                    will-change: transform, opacity;
                }

                .hero-card-float,
                .hero-card-float-delayed {
                    animation: hero-float-card 7s ease-in-out infinite;
                    will-change: transform;
                }

                .hero-card-float-delayed {
                    animation-delay: 1.2s;
                }

                .hero-color-orbit {
                    animation: spin 28s linear infinite;
                }

                .hero-color-orbit-reverse {
                    animation: spin 38s linear infinite reverse;
                }

                .hero-color-orbit-slow {
                    animation: spin 52s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-color-particle,
                    .hero-card-float,
                    .hero-card-float-delayed,
                    .hero-color-orbit,
                    .hero-color-orbit-reverse,
                    .hero-color-orbit-slow {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    )
}
