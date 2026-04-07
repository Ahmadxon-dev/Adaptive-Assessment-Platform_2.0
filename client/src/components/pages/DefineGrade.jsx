import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

function fetchData() {
    return fetch(`${import.meta.env.VITE_SERVER}/grade/gradeslist`)
        .then(res => res.json())
}

function DefineGrade(props) {
    const {grade} = useParams()
    const {isPending, data} = useQuery({
        queryKey: ["gradesList"],
        queryFn: fetchData
    })
    const filtered = !isPending && data.filter(el => el.grade === grade)
    const eachGrade = filtered[0]
    if (isPending) {
        return <Loader variant={"big"}/>
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">{eachGrade.grade}-sinf</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        eachGrade.terms.map(term => {
                            return <Card
                                key={term._id}
                                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle
                                        className="text-lg font-semibold text-slate-700 text-center">{term.term_number}-CHORAK</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2">
                                        {
                                            term.bsbArray.map(bsb => {
                                                return <Button asChild
                                                    key={bsb.bsbNumber}
                                                    variant="secondary"
                                                    className="w-full underline rounded-2xl justify-center  bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                                                >
                                                    <Link to={`${term.term_number}/${bsb.bsbNumber}-bsb`}>
                                                        {bsb.bsbNumber}-BSB
                                                    </Link>
                                                </Button>
                                            })
                                        }
                                        {
                                            term.chsb!==0 && <Button asChild variant={`secondary`}
                                                                    className="w-full rounded-2xl  underline justify-center  bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                                            >
                                                <Link to={`${term.term_number}/chsb`}>
                                                    CHSB
                                                </Link>
                                            </Button>
                                        }
                                        {
                                            term.chsb===0 && term.bsbArray.length===0 && <div className="text-center py-4 text-slate-400 text-sm">Ma'lumot yo'q</div>
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DefineGrade;