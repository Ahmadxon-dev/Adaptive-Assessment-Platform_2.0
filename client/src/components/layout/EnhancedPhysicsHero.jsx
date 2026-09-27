import { ArrowRight, Atom, BookOpen, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const particles = [
    "left-[8%] top-[16%] h-2 w-2 bg-blue-400 [animation-delay:0ms]",
    "left-[16%] top-[72%] h-1.5 w-1.5 bg-purple-400 [animation-delay:220ms]",
    "left-[28%] top-[25%] h-1 w-1 bg-sky-400 [animation-delay:430ms]",
    "left-[38%] top-[84%] h-2 w-2 bg-violet-400 [animation-delay:640ms]",
    "left-[51%] top-[10%] h-1.5 w-1.5 bg-blue-500 [animation-delay:860ms]",
    "left-[63%] top-[68%] h-1 w-1 bg-fuchsia-400 [animation-delay:1080ms]",
    "left-[74%] top-[19%] h-2 w-2 bg-sky-500 [animation-delay:1300ms]",
    "left-[88%] top-[78%] h-1.5 w-1.5 bg-purple-500 [animation-delay:1520ms]",
    "left-[93%] top-[34%] h-1 w-1 bg-blue-400 [animation-delay:1740ms]",
    "left-[44%] top-[47%] h-1.5 w-1.5 bg-indigo-400 [animation-delay:1960ms]",
];
export default function EnhancedPhysicsHero() {
    return (
        <section className="relative isolate min-h-[calc(100vh-1px)] overflow-hidden bg-white px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
            {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_18%,rgba(59,130,246,0.2),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(139,92,246,0.18),transparent_30%),linear-gradient(135deg,#ffffff_0%,#eff6ff_46%,#faf5ff_100%)]" /> */}
            <div className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(37,99,235,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.07)_1px,transparent_1px)] [background-size:42px_42px]" />

            {particles.map((particle) => (
                <span
                    key={particle}
                    className={`hero-particle absolute rounded-full opacity-70 ${particle}`}
                />
            ))}

            <div className="mx-auto grid min-h-[calc(100vh-15rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.78fr_1fr]">
                <div className="relative z-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 ">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        Fizika lab
                    </div>

                    <h1 className="text-3xl font-black leading-[1.03] tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                        <span className="block">Koinot qonunlarini o'rganing, bilimlaringizni sinang.</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                        {"Mavzuni tanlang, test ishlang, natijani darhol ko'ring."}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-sm font-semibold text-white  transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-purple-500"
                        >
                            <Link to="/gradelist">
                                <BookOpen className="h-4 w-4" />
                                Testni boshlash
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-md border-blue-200 bg-white/70 px-6 text-sm font-semibold text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                        >
                            <Link to="/guide">
                                <PlayCircle className="h-4 w-4" />
                                {"Qo'llanma"}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative mx-auto aspect-[1.05] w-full max-w-[620px] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <div className="absolute inset-0 rounded-[36px] border border-blue-100 bg-white/55 shadow-[0_24px_80px_rgba(37,99,235,0.14)]" />
                    <div className="absolute inset-5 rounded-[28px] border border-purple-100 bg-gradient-to-br from-white/80 via-blue-50/70 to-purple-50/80" />

                    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-400 shadow-[0_0_48px_rgba(251,146,60,0.5)]">
                        <div className="absolute inset-4 rounded-full bg-white/20" />
                    </div>

                    <div className="hero-orbit absolute inset-[15%] rounded-full border border-blue-300/60">
                        <span className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_10px_24px_rgba(37,99,235,0.28)]" />
                    </div>

                    <div className="hero-orbit-reverse absolute inset-[26%] rounded-full border border-purple-300/60">
                        <span className="absolute bottom-0 left-1/2 h-7 w-7 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-[0_10px_24px_rgba(124,58,237,0.28)]" />
                    </div>

                    <div className="hero-orbit-slow absolute inset-[7%] rounded-full border border-dashed border-sky-300/70">
                        <span className="absolute right-[13%] top-[12%] h-5 w-5 rounded-full bg-gradient-to-br from-cyan-300 to-sky-500 shadow-[0_8px_18px_rgba(14,165,233,0.24)]" />
                    </div>

                    {/* <div className="hero-card-float absolute left-0 top-8 w-52 rounded-lg border border-blue-100 bg-white/85 p-4 shadow-[0_18px_50px_rgba(37,99,235,0.13)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Test</p>
                            <Atom className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-900">F = ma</p>
                        <div className="mt-3 h-2 rounded-full bg-blue-100">
                            <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        </div>
                    </div> */}

                    {/* <div className="hero-card-float-delayed absolute bottom-8 right-0 w-48 rounded-lg border border-purple-100 bg-white/85 p-4 shadow-[0_18px_50px_rgba(124,58,237,0.13)]">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Natija</p>
                        <p className="mt-2 text-3xl font-black text-slate-950">100%</p>
                        <p className="mt-1 text-xs text-slate-500">Aniq javoblar</p>
                    </div> */}

                    {/* <div className="absolute bottom-12 left-10 hidden rounded-lg border border-sky-100 bg-white/80 px-4 py-3 font-mono text-sm font-semibold text-blue-700 shadow-sm sm:block">
                        E = mc<sup>2</sup>
                    </div> */}
                </div>
            </div>

            <style>{`
                @keyframes hero-float {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -10px, 0); }
                }

                @keyframes hero-particle {
                    0%, 100% { transform: translate3d(0, 0, 0); opacity: .5; }
                    50% { transform: translate3d(10px, -14px, 0); opacity: .95; }
                }

                .hero-card-float,
                .hero-card-float-delayed {
                    animation: hero-float 7s ease-in-out infinite;
                    will-change: transform;
                }

                .hero-card-float-delayed {
                    animation-delay: 1.2s;
                }

                .hero-particle {
                    animation: hero-particle 5s ease-in-out infinite;
                    will-change: transform, opacity;
                }

                .hero-orbit {
                    animation: spin 30s linear infinite;
                }

                .hero-orbit-reverse {
                    animation: spin 38s linear infinite reverse;
                }

                .hero-orbit-slow {
                    animation: spin 52s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-card-float,
                    .hero-card-float-delayed,
                    .hero-particle,
                    .hero-orbit,
                    .hero-orbit-reverse,
                    .hero-orbit-slow {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}
