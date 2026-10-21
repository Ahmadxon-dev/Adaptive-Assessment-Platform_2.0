import React, { useEffect } from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import EachGradeAddTopic from "@/components/pages/EachGradeAddTopic.jsx";
import { useSelector } from 'react-redux';

function QuestionTypePage(props) {
    const params = useParams()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)    
    const questionTypes = ["multiple-choice", 'open-ended']
    useEffect(() => {
        if (user.role === "user") {
            navigate("/home")
        }
    }, [])



    if (params.grade === "abituriyent" || params.grade === "attestatsiya"){
        return <EachGradeAddTopic />
    }
    return (
        <div className="bg-gray-100 h-screen">
            <div className="space-y-10 pt-20">
                <p className="text-3xl font-bold text-center text-gray-900">Savol turini tanlang</p>
                <div className="flex justify-evenly">
                    {
                        questionTypes.map(el=>{
                            return <Button asChild key={el} className={`px-8 py-3 pb-4 text-2xl`}>
                                <Link to={el}>
                                    {el==="multiple-choice"?"Yopiq Test":"Ochiq Test"}
                                </Link>
                            </Button>
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default QuestionTypePage;