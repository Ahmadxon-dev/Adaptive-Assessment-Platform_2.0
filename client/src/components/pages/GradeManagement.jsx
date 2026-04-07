import React, {lazy, useState} from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {BookOpen, FileText, Plus, Trash2} from "lucide-react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useToast} from "@/hooks/use-toast.js";
function fetchData() {
    return fetch(`${import.meta.env.VITE_SERVER}/grade/gradeslist`)
        .then(res => res.json())
}
const addBsb = async ({grade, term_number}) =>{
    const response = await fetch(`${import.meta.env.VITE_SERVER}/grade/addbsb`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grade,
            term_number
        })
    })
    return response.json()
}
const addChsb = async ({grade, term_number}) =>{
    const response = await fetch(`${import.meta.env.VITE_SERVER}/grade/addchsb`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grade,
            term_number
        })
    })
    return response.json()
}
const removeBsb = async ({grade, term_number, id})=>{
    const res = await fetch(`${import.meta.env.VITE_SERVER}/grade/deletebsb/${id}`, {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({grade, term_number, id})
    })
    return res.json()
}
const removeChsb = async ({grade, term_number}) =>{
    const res = await fetch(`${import.meta.env.VITE_SERVER}/grade/deletechsb`, {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({grade, term_number})
    })
    return res.json()
}
// const { mutate: mutateUser, isLoading: isLoadingUser, isError: isErrorUser, error: userError, isSuccess: isSuccessUser } = useMutation(postUserData);

function GradeManagement(props) {
    const queryClient = useQueryClient()
    const {toast} = useToast()
    const [loadingKey, setLoadingKey] = useState(null);
    const {data, isPending:isPendingData} = useQuery({
        queryKey:['gradesList'],
        queryFn:fetchData,
        select:(res)=>{
            const filteredData = res.filter(el=> el.grade!=="abituriyent" && el.grade!=="attestatsiya")
            return filteredData.sort((a,b) => a.grade - b.grade)
        }
    })
    const {mutate:mutationAddBsb, isPending:isPendingAddBsb} = useMutation({mutationFn:addBsb,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['gradesList'])
            toast({
                title:data.msg,
                variant:"success",
                duration:4000
            })
        },
        onError:(data)=>{
            toast({
                title:data.error,
                variant:"destructive",
                duration:4000
            })
        }
    })
    const {mutate:mutationAddChsb, isPending:isPendingAddChsb} = useMutation({
        mutationFn:addChsb,
        onSuccess: data=>{
            queryClient.invalidateQueries(["gradesList"])
            toast({
                title:data.msg,
                variant:"success",
                duration:4000,
            })
        },
        onError: data=>{
          toast({
              title:data.error,
              variant:"destructive",
              duration:4000,
          })
        }
    })
    const {mutate:mutationRemoveBsb, isPending:isPendingRemoveBsb} = useMutation({mutationFn: removeBsb,
        onSuccess:data=>{
            queryClient.invalidateQueries(['gradesList'])
            toast({
                title:data.msg,
                variant:"success",
                duration:4000
            })
        },
        onError: data=>{
            toast({
                title:data.error,
                variant:'destructive',
                duration:4000
            })
        }
    })
    const {mutate:mutationRemoveChsb, isPending:isPendingRemoveChsb} = useMutation({mutationFn:removeChsb,
        onSuccess:data=>{
            queryClient.invalidateQueries(['gradesList'])
            toast({
                title:data.msg,
                variant:"success",
                duration:4000
            })
        },
        onError: data=>{
            toast({
                title:data.error,
                variant:'destructive',
                duration:4000
            })
        }})
    if (isPendingData) {
        return (<Loader variant={"big"}/>)
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/*<div className="flex items-center justify-between mb-8">*/}
                {/*    <div>*/}
                {/*        <h1 className="text-3xl font-bold text-gray-900">Grade Management</h1>*/}
                {/*        <p className="text-gray-600 mt-2">Manage control works for each grade and term</p>*/}
                {/*    </div>*/}
                {/*    <Button*/}
                {/*        // onClick={addGrade}*/}
                {/*        className="flex items-center gap-2">*/}
                {/*        <Plus className="w-4 h-4" />*/}
                {/*        Add Grade*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <div className="space-y-8">
                    {!isPendingData && data.map((grade) => (
                        <Card key={grade._id} className="shadow-sm border-0 bg-white">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-xl">{grade.grade}-sinf</span>
                                    </CardTitle>

                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {grade.terms.map((term) => (
                                        <Card key={term._id} className="border border-gray-200">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm font-medium text-gray-700">Term {term.term_number}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {/* BSB Section */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">BSB</span>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={()=> {
                                                                const key = `${grade.grade}-${term.term_number}`
                                                                setLoadingKey(key)
                                                                mutationAddBsb({
                                                                    grade: grade.grade,
                                                                    term_number: term.term_number
                                                                },
                                                                    {
                                                                        onSettled:()=>setLoadingKey(null)
                                                                    }
                                                                )
                                                            }}
                                                            className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
                                                            disabled={isPendingAddBsb && loadingKey===`${grade.grade}-${term.term_number}`}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {term.bsbArray.map((bsb) => (
                                                            <div key={bsb._id} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                                                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                                    {/*<FileText className="w-3 h-3 mr-1" />*/}
                                                                    {bsb.bsbNumber}-BSB
                                                                </Badge>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => {
                                                                        const key = `${grade.grade}-${bsb._id}`
                                                                        setLoadingKey(key)
                                                                        mutationRemoveBsb({grade:grade.grade, term_number:term.term_number,id:bsb._id},
                                                                            {onSettled:()=>setLoadingKey(null)}
                                                                        )
                                                                    }}
                                                                    disabled={isPendingRemoveBsb && loadingKey===`${grade.grade}-${bsb._id}`}
                                                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        {term.bsbArray.length === 0 && <p className="text-xs text-center text-gray-400">Bsb qo'shilmagan</p>}
                                                    </div>
                                                </div>

                                                {/* CHSB Section */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">CHSB</span>
                                                        {!term.chsb && (
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    const key = `${grade.grade}-${term.term_number}`
                                                                    setLoadingKey(key)
                                                                    mutationAddChsb({
                                                                        grade: grade.grade,
                                                                        term_number: term.term_number
                                                                    },
                                                                        {
                                                                            onSettled:()=>setLoadingKey(null)
                                                                        }
                                                                    )
                                                                }}
                                                                className="h-6 w-6 p-0 text-green-600 hover:bg-green-50"
                                                                disabled={isPendingAddChsb && loadingKey===`${grade.grade}-${term.term_number}`}
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {term.chsb===1 ? (
                                                            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                                                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                                                    <FileText className="w-3 h-3 mr-1" />
                                                                    CHSB
                                                                </Badge>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => {
                                                                        const key = `${grade.grade}-${term.term_number}`
                                                                        setLoadingKey(key)
                                                                        mutationRemoveChsb({grade:grade.grade, term_number:term.term_number},
                                                                            {onSettled:()=>setLoadingKey(null)}
                                                                        )
                                                                    }}
                                                                    disabled={isPendingRemoveChsb && loadingKey===`${grade.grade}-${term.term_number}`}
                                                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-gray-400 text-center">Chsb qo'shilmagan</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GradeManagement;