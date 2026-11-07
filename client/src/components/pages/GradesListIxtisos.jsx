import { GRADES_FOR_SPECIALIZED_CLASSES as grades } from "@/lib/constants"
import { Link } from "react-router-dom"

const GradesListIxtisos = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="space-y-10 pt-20">
                <p className="text-3xl font-bold text-center text-gray-900">Test Yechish Ixtisoslashgan Sinflar</p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                    {grades.map((grade) => (
                        <div key={grade.name} className="flex flex-col items-center">
                            <Link
                                to={`${grade.link}`}
                                className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <img
                                    src={grade.image}
                                    alt={`${grade.name}-sinf`}
                                    className="w-full h-48 object-cover rounded"
                                />
                            </Link>

                            <span className="bg-white px-4 py-2 rounded text-sm font-medium text-gray-700 shadow-sm">
                                {grade.name}-sinf
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GradesListIxtisos
