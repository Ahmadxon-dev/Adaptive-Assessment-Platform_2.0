import React from 'react'
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

function DefiningAddTopics(props) {
    const allGrades = [7, 8, 9, 10, 11, 'Abituriyent', 'Attestatsiya']
    const grades = allGrades.slice(0, 5)
    const others = allGrades.slice(5,7)

    return (
        <div className="bg-gray-100 h-screen">
            <div className="space-y-10 pt-20">
                <p className="text-3xl font-bold text-center text-gray-900">Savollarni Qo'shish</p>
                <div className="flex justify-evenly">
                    {
                        grades.map(element => {
                            return <Button asChild key={element} className={`px-8 py-3 pb-4 text-2xl`}>
                                <Link to={`${element}`}>
                                    {element}-sinf
                                </Link>
                            </Button>
                        })
                    }
                </div>
                <div className="flex justify-evenly pt-10">
                    {
                        others.map(element => {
                            return <Button key={element} asChild={true} className=" px-8 py-3 pb-4 text-2xl">
                                <Link to={element.toLowerCase()} >
                                    {element}
                                </Link>
                            </Button>

                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DefiningAddTopics
