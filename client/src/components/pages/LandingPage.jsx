import { ArrowRight, CheckCircle2, ClipboardList, FileText, Layers3, PlayCircle, Sparkles, Zap } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import reactLogo from "../../assets/reactWhite.svg"

const teacherFeatures = [
    {
        icon: ClipboardList,
        title: "Savollar bazasi",
        text: "Adminlar 7, 8, 9, 10, 11-sinflar hamda attestatsiya va abituriyent bo'limlari uchun fizika savollarini qo'shadi."
    },
    {
        icon: FileText,
        title: "Test va natija",
        text: "Foydalanuvchi mavzu, savol soni, qiyinlik darajasi va timer tanlab test ishlaydi, yakunda natijani Word ko'rinishida oladi."
    },
    {
        icon: Layers3,
        title: "Variantli Word",
        text: "O'qituvchilar bir xil savollar asosida bir nechta variant yaratadi: savollar o'zgarmaydi, faqat tartibi aralashadi."
    }
]

const highlights = [
    "7-11-sinflar, attestatsiya va abituriyent",
    "Ochiq va yopiq savol turlari",
    "3 xil qiyinlik darajasi",
    "Timer, natija va Word eksport"
]

const steps = [
    "Kategoriya va mavzularni tanlang",
    "Savol soni, qiyinlik va timerni belgilang",
    "Testni boshlang yoki variantlar yarating",
    "Natija va testlarni Word qilib oling"
]

function renderMoleculeField(variant, className) {
    const commonProps = {
        "aria-hidden": "true",
        className,
        viewBox: "0 0 820 520",
        fill: "none"
    }

    if (variant === "hero") {
        return (
            <svg {...commonProps}>
                <path
                    d="M355 230 505 128M355 230 568 324M355 230 188 312M355 230 288 98"
                    stroke="currentColor"
                    strokeOpacity=".42"
                    strokeWidth="3"
                />
                <path
                    d="M188 312 86 246M188 312 146 454M568 324 706 224M568 324 654 442M505 128 628 76"
                    stroke="currentColor"
                    strokeOpacity=".22"
                    strokeWidth="2"
                />
                <circle cx="355" cy="230" r="84" stroke="currentColor" strokeOpacity=".56" strokeWidth="3" />
                <circle cx="505" cy="128" r="56" stroke="currentColor" strokeOpacity=".45" strokeWidth="3" />
                <circle cx="568" cy="324" r="68" stroke="currentColor" strokeOpacity=".45" strokeWidth="3" />
                <circle cx="188" cy="312" r="58" stroke="currentColor" strokeOpacity=".42" strokeWidth="3" />
                <circle cx="288" cy="98" r="38" stroke="currentColor" strokeOpacity=".32" strokeWidth="2" />
                <circle cx="86" cy="246" r="28" stroke="currentColor" strokeOpacity=".28" strokeWidth="2" />
                <circle cx="146" cy="454" r="36" stroke="currentColor" strokeOpacity=".28" strokeWidth="2" />
                <circle cx="706" cy="224" r="32" stroke="currentColor" strokeOpacity=".28" strokeWidth="2" />
                <circle cx="654" cy="442" r="40" stroke="currentColor" strokeOpacity=".28" strokeWidth="2" />
                <circle cx="628" cy="76" r="24" stroke="currentColor" strokeOpacity=".24" strokeWidth="2" />

                {[
                    [315, 202],
                    [352, 188],
                    [398, 216],
                    [330, 268],
                    [390, 292],
                    [432, 246],
                    [486, 106],
                    [528, 150],
                    [176, 284],
                    [212, 338],
                    [550, 294],
                    [610, 346],
                    [146, 454],
                    [654, 442],
                    [706, 224]
                ].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" fillOpacity=".85" />
                ))}
            </svg>
        )
    }

    if (variant === "chain") {
        return (
            <svg {...commonProps}>
                <path
                    d="M90 292 210 190 356 252 502 134 658 216 758 126"
                    stroke="currentColor"
                    strokeOpacity=".52"
                    strokeWidth="3"
                />
                <path
                    d="M210 190 268 86M356 252 310 382M502 134 566 262M658 216 714 352"
                    stroke="currentColor"
                    strokeOpacity=".25"
                    strokeWidth="2"
                />
                {[
                    [90, 292, 34],
                    [210, 190, 52],
                    [356, 252, 44],
                    [502, 134, 58],
                    [658, 216, 46],
                    [758, 126, 30],
                    [268, 86, 26],
                    [310, 382, 34],
                    [566, 262, 28],
                    [714, 352, 36]
                ].map(([cx, cy, r]) => (
                    <circle
                        key={`${cx}-${cy}`}
                        cx={cx}
                        cy={cy}
                        r={r}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity=".75"
                    />
                ))}
                {[
                    [90, 292],
                    [210, 190],
                    [356, 252],
                    [502, 134],
                    [658, 216],
                    [758, 126],
                    [310, 382]
                ].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}-dot`} cx={cx} cy={cy} r="5" fill="currentColor" fillOpacity=".9" />
                ))}
            </svg>
        )
    }

    if (variant === "ring") {
        return (
            <svg {...commonProps}>
                <path
                    d="M410 96 570 188 570 336 410 428 250 336 250 188Z"
                    stroke="currentColor"
                    strokeOpacity=".48"
                    strokeWidth="3"
                />
                <path
                    d="M410 96 410 428M250 188 570 336M570 188 250 336"
                    stroke="currentColor"
                    strokeOpacity=".22"
                    strokeWidth="2"
                />
                <circle cx="410" cy="96" r="44" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="570" cy="188" r="54" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="570" cy="336" r="44" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="410" cy="428" r="58" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="250" cy="336" r="50" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="250" cy="188" r="38" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
                <circle cx="410" cy="262" r="26" stroke="currentColor" strokeOpacity=".45" strokeWidth="2" />
                {[
                    [410, 96],
                    [570, 188],
                    [570, 336],
                    [410, 428],
                    [250, 336],
                    [250, 188],
                    [410, 262]
                ].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}-dot`} cx={cx} cy={cy} r="5" fill="currentColor" fillOpacity=".9" />
                ))}
            </svg>
        )
    }

    return (
        <svg {...commonProps}>
            <path
                d="M128 116 246 204 374 128 494 232 644 154M246 204 210 356M374 128 420 330M494 232 594 368"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity=".5"
            />
            <path
                d="M128 116 210 356 420 330 594 368 644 154"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity=".18"
            />
            {[
                [128, 116, 30],
                [246, 204, 42],
                [374, 128, 34],
                [494, 232, 52],
                [644, 154, 36],
                [210, 356, 44],
                [420, 330, 30],
                [594, 368, 40]
            ].map(([cx, cy, r]) => (
                <circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={r}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity=".72"
                />
            ))}
            {[
                [128, 116],
                [246, 204],
                [374, 128],
                [494, 232],
                [644, 154],
                [210, 356],
                [420, 330],
                [594, 368]
            ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}-dot`} cx={cx} cy={cy} r="5" fill="currentColor" fillOpacity=".9" />
            ))}
        </svg>
    )
}

export default function LandingPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#07071f] text-white">
            <section className="relative isolate min-h-[calc(100vh+5rem)] px-4 py-6 sm:px-6 lg:px-8">
                <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.42),transparent_24%),radial-gradient(circle_at_70%_18%,rgba(139,92,246,0.46),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(168,85,247,0.52),transparent_30%),linear-gradient(135deg,#062b57_0%,#2563eb_34%,#7c3aed_68%,#a21caf_100%)]" />
                <div className="absolute inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[#07071f] [clip-path:ellipse(78%_48%_at_50%_100%)]" />
                {renderMoleculeField(
                    "hero",
                    "pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[62%] text-cyan-200 opacity-70 lg:block"
                )}

                <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
                    <Link to="/" className="inline-flex items-center  text-lg font-black tracking-normal">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200">
                            <img src={reactLogo} alt="logo" />
                        </div>
                        <h2 className="ml-3 text-xl font-bold text-white  transition-colors duration-200 truncate">
                            Fizika360
                        </h2>
                    </Link>

                    <Button
                        asChild
                        variant="outline"
                        className="hidden rounded-full border-white/25 bg-white/[0.1] text-white transition-all duration-300 hover:-translate-y-0.5  sm:inline-flex"
                    >
                        <Link to="/home">
                            Platformaga kirish
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </nav>

                <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-12 pb-28 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:pb-24 lg:pt-8">
                    <div className="relative z-10 max-w-4xl">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.12] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                            <Sparkles className="h-4 w-4 text-cyan-200" />
                            Fizika test platformasi
                        </div>

                        <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-5xl lg:text-6xl ">
                            Fizika testlarini tanlang, ishlang va Wordga aylantiring qiling.
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/82 sm:text-xl">
                            7-11-sinflar, attestatsiya va abituriyent uchun fizika testlari. Mavzular, qiyinlik, timer,
                            ochiq-yopiq savollar, natijalar va Word eksport bitta joyda.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 text-sm font-bold text-white  transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <Link to="/home">
                                    Platformaga kirish
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-full border-white/30 bg-white/10 px-8 text-sm font-bold text-white  transition-all duration-300 hover:-translate-y-0.5  "
                            >
                                <Link to="/guide">
                                    <PlayCircle className="h-5 w-5" />
                                    {"Qanday ishlashini ko'rish"}
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                            {highlights.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.09] px-4 py-3 text-sm font-semibold text-white/90"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto min-h-[560px] w-full max-w-[640px]">
                        <svg
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full text-cyan-200/55"
                            viewBox="0 0 640 560"
                            fill="none"
                        >
                            <path
                                d="M118 184 300 126 488 210M300 126 374 390M118 184 208 430M488 210 374 390 208 430"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeOpacity=".38"
                            />
                            <circle cx="118" cy="184" r="38" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
                            <circle
                                cx="300"
                                cy="126"
                                r="54"
                                stroke="currentColor"
                                strokeOpacity=".55"
                                strokeWidth="2"
                            />
                            <circle cx="488" cy="210" r="46" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
                            <circle
                                cx="374"
                                cy="390"
                                r="62"
                                stroke="currentColor"
                                strokeOpacity=".46"
                                strokeWidth="2"
                            />
                            <circle cx="208" cy="430" r="34" stroke="currentColor" strokeOpacity=".4" strokeWidth="2" />
                        </svg>

                        <div className="absolute left-[9%] top-[7%] w-[58%] -rotate-6 rounded-[1.6rem] border border-white/25 bg-white p-5 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-600">
                                    Savollar bazasi
                                </p>
                                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                                    7-11 sinf
                                </span>
                            </div>
                            <div className="mt-5 space-y-3">
                                <div className="h-3 w-5/6 rounded-full bg-slate-200" />
                                <div className="h-3 w-3/5 rounded-full bg-slate-200" />
                                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4">
                                    <p className="text-sm font-black text-purple-700">Attestatsiya va abituriyent</p>
                                    <p className="mt-2 text-xs font-semibold text-slate-500">
                                        {"Mavzular bo'yicha fizika savollari"}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-xl bg-blue-100 px-3 py-2 text-xs font-black text-blue-700">
                                        Yopiq test
                                    </div>
                                    <div className="rounded-xl bg-cyan-100 px-3 py-2 text-xs font-black text-cyan-700">
                                        Ochiq savol
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-[4%] top-[18%] w-[45%] rotate-6 rounded-[1.4rem] border border-white/25 bg-gradient-to-br from-[#201057] via-[#3b1a8f] to-[#7c3aed] p-5 text-white shadow-[0_24px_70px_rgba(30,15,80,0.28)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                <Sparkles className="h-6 w-6 text-cyan-100" />
                            </div>
                            <p className="mt-5 text-sm font-bold text-white/72">Qiyinlik darajasi</p>
                            <p className="mt-1 text-4xl font-black">3 xil</p>
                            <p className="mt-1 text-sm font-bold text-cyan-100">{"oson, o'rta, qiyin"}</p>
                        </div>

                        <div className="absolute bottom-[12%] left-[18%] w-[50%] rotate-3 rounded-[1.5rem] border border-white/25 bg-white/[0.16] p-5 text-white shadow-[0_22px_60px_rgba(15,23,42,0.16)]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/20 text-cyan-100">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                                    Word eksport
                                    </p>
                                    <p className="text-lg font-black">Natija + test varaqasi</p>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                <span className="rounded-full bg-white/16 px-3 py-2 text-center text-xs font-black">
                                    Timer
                                </span>
                                <span className="rounded-full bg-white/16 px-3 py-2 text-center text-xs font-black">
                                Word
                                </span>
                                <span className="rounded-full bg-white/16 px-3 py-2 text-center text-xs font-black">
                                    Natija
                                </span>
                            </div>
                        </div>

                        <div className="absolute bottom-[3%] right-[9%] w-[34%] rounded-[1.4rem] border border-white/25 bg-cyan-300 p-5 text-slate-950 shadow-[0_20px_60px_rgba(34,211,238,0.2)]">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-800">Variantlar</p>
                            <p className="mt-2 text-4xl font-black">A/B/C</p>
                            <p className="mt-1 text-sm font-bold text-slate-700">savollar tartibi aralashadi</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative isolate overflow-hidden bg-[#07071f] px-4 py-20 sm:px-6 lg:px-8">
                {renderMoleculeField(
                    "chain",
                    "pointer-events-none absolute -right-24 -top-20 h-[430px] w-[720px] text-purple-200 opacity-22"
                )}
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                            {"O'qituvchilar uchun"}
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
                            {
                                "Platforma test ishlash, savollar qo'shish va Word variantlar tayyorlashni bir joyga jamlaydi."
                            }
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {teacherFeatures.map((feature) => {
                            const Icon = feature.icon

                            return (
                                <article
                                    key={feature.title}
                                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/[0.16] via-white/[0.08] to-cyan-400/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200/40"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-300/16 text-purple-100">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-black text-white">{feature.title}</h3>
                                    <p className="mt-3 leading-7 text-white/70">{feature.text}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#07071f] via-[#0f2d4c] to-[#2d1170] px-4 py-20 sm:px-6 lg:px-8">
                {renderMoleculeField(
                    "ring",
                    "pointer-events-none absolute -left-36 bottom-[-120px] h-[460px] w-[720px] -rotate-12 text-purple-200 opacity-18"
                )}
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-purple-200">Jarayon</p>
                        <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
                            Kategoriya tanlashdan natija Word gacha.
                        </h2>
                        <p className="mt-5 max-w-xl leading-8 text-white/72">
                            {"Foydalanuvchi kerakli mavzularni tanlaydi, savol soni va timerni belgilaydi,"}
                            {" testni yakunlagach natijasini Word shaklida oladi."}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {steps.map((step, index) => (
                            <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.08] p-5">
                                <p className="text-sm font-black text-cyan-200">0{index + 1}</p>
                                <p className="mt-3 text-lg font-bold text-white">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative isolate overflow-hidden bg-[#07071f] px-4 py-20 text-center sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.22),transparent_34%)]" />
                {renderMoleculeField(
                    "constellation",
                    "pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[780px] -translate-x-1/2 -translate-y-1/2 rotate-6 text-cyan-200 opacity-15"
                )}
                <div className="relative mx-auto max-w-4xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600">
                        <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-7 text-3xl font-black tracking-normal text-white sm:text-5xl">
                        Fizika testlarini tezroq tayyorlashga tayyormisiz?
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
                        Platformani oching va keyingi testingizni yaratishni boshlang.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="mt-8 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 text-sm font-bold text-white  transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Link to="/home">
                            {"Platformaga o'tish"}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            <style>{`
              @keyframes landing-particle {
                  0%, 100% { transform: translate3d(0, 0, 0); opacity: .62; }
                  50% { transform: translate3d(8px, -14px, 0); opacity: 1; }
              }

              .landing-particle {
                  animation: landing-particle 7s ease-in-out infinite;
                  will-change: transform, opacity;
              }

              @media (prefers-reduced-motion: reduce) {
                  .landing-particle {
                      animation: none;
                  }
              }
          `}</style>
        </main>
    )
}
