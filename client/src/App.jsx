import Navbar from "@/components/layout/Navbar.jsx"
import { useDispatch } from "react-redux"
import { logout, setUser } from "@/features/user/userSlice.js"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import TestPage from "@/components/pages/TestPage.jsx"
import Loader from "@/components/ui/Loader.jsx"
import { jwtDecode } from "jwt-decode"

const AddTopicsPage = lazy(() => import("./components/pages/AddTopicsPage.jsx"))
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage.jsx"))
const AllResultsPage = lazy(() => import("./components/pages/AllResultsPage.jsx"))
const SettingsPage = lazy(() => import("./components/pages/SettingsPage.jsx"))
const TestToPdf = lazy(() => import("./components/pages/TestToPdf.jsx"))
const UsersPage = lazy(() => import("./components/pages/UsersPage.jsx"))
const EachResultPage = lazy(() => import("./components/pages/EachResultPage.jsx"))
const ResultsPage = lazy(() => import("./components/pages/ResultsPage.jsx"))
const DefiningTestPage = lazy(() => import("./components/pages/DefiningTestPage.jsx"))
const HomePage = lazy(() => import("./components/pages/HomePage.jsx"))
const LoginForm = lazy(() => import("./components/layout/LoginForm.jsx"))
const SignupForm = lazy(() => import("./components/layout/SignupForm.jsx"))
const GuidePage = lazy(() => import("./components/pages/GuidePage.jsx"))
const GradesList = lazy(() => import("./components/pages/GradesList.jsx"))
const DefineGrade = lazy(() => import("./components/pages/DefineGrade.jsx"))
const GradeManagement = lazy(() => import("./components/pages/GradeManagement.jsx"))
const AttestatsiyaPage = lazy(() => import("./components/pages/AttestatsiyaPage.jsx"))
const AbituriyentPage = lazy(() => import("./components/pages/AbituriyentPage.jsx"))
const DefiningAddTopics = lazy(() => import("./components/pages/DefiningAddTopics.jsx"))
const EachGradeAddTopic = lazy(() => import("./components/pages/EachGradeAddTopic.jsx"))
const QuestionTypePage = lazy(() => import("./components/pages/QuestionTypePage.jsx"))
const LandingPage = lazy(() => import("./components/pages/LandingPage.jsx"))

function AppLayout() {
    return (
        <div className="flex">
            <Navbar />
            <div className={`flex-1 transition-all duration-300 `}>
                <Suspense fallback={<Loader variant={"big"} />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

function App() {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    try {
                        const decoded = jwtDecode(token)
                        dispatch(setUser(decoded))
                    } catch (e) {
                        navigate("/signin")
                        dispatch(logout())
                    }
                    await fetch(`${import.meta.env.VITE_SERVER}/auth/profile/`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            dispatch(setUser(data.user))
                            if (data.error) {
                                dispatch(logout())
                                navigate("/signin")
                            }
                        })
                        .catch(() => {
                            dispatch(logout())
                        })
                }
            } catch (error) {
                console.error("User fetch error:", error)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (
            !token &&
            window.location.pathname !== "/signup" &&
            window.location.pathname !== "/guide" &&
            window.location.pathname !== "/home" &&
            window.location.pathname !== "/"
        ) {
            navigate("/signin")
        }
    }, [token, navigate])

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route element={<AppLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/gradelist" element={<GradesList />} />
                <Route path="/gradelist/:grade" element={<DefineGrade />} />
                <Route path="/gradelist/abituriyent" element={<AbituriyentPage />} />
                <Route path="/gradelist/attestatsiya" element={<AttestatsiyaPage />} />
                <Route path="/gradelist/:grade/:term/:test" element={<DefiningTestPage />} />
                <Route path="/grademanagement" element={<GradeManagement />} />
                <Route path="/test/:testId" element={<TestPage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<LoginForm />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/results/:testId" element={<EachResultPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/testtopdf" element={<TestToPdf />} />
                <Route path="/addtopic" element={<AddTopicsPage />} />
                <Route path="/defining-grades" element={<DefiningAddTopics />} />
                <Route path="/defining-grades/:grade" element={<QuestionTypePage />} />
                <Route path="/defining-grades/:grade/:questionType" element={<EachGradeAddTopic />} />
                <Route path="/profile/settings" element={<SettingsPage />} />
                <Route path="/allresults" element={<AllResultsPage />} />
                <Route path="/guide" element={<GuidePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
