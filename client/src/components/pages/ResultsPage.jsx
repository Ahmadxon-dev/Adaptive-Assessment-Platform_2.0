import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link, useSearchParams } from "react-router-dom"
import { Loader2, Eye, ChevronLeft, ChevronRight, Clock, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button.jsx"
import { useQuery } from "@tanstack/react-query"
import { Document, Packer, Paragraph, TextRun, ImageRun, SectionType } from "docx"
import { saveAs } from "file-saver"
import Loader from "@/components/ui/Loader.jsx"
import PaginationComponent from "../shared/pagination"
import { testResultUserPageSize } from "@/lib/constants"

const fetchResults = async (email, page) => {
    const response = await fetch(
        `${import.meta.env.VITE_SERVER}/test/results/${email}?page=${page}&pageSize=${testResultUserPageSize}`, {
           headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`,
           }
        }
    )
    if (!response.ok) {
        throw new Error("Failed to fetch results")
    }
    return response.json()
}

const useTestResults = (email, page) => {
    return useQuery({
        queryKey: ["test/results", email, page, testResultUserPageSize], // Ensure uniqueness for caching
        queryFn: () => fetchResults(email, page),
        enabled: !!email // Prevents execution if email is undefined/null
    })
}
function ResultsPage(props) {
    const user = useSelector((state) => state.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: { test: paginatedData, isNext } = {}, isPending } = useTestResults(
        user?.email,
        searchParams.get("page")
    )

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" }, { replace: true })
        }
    }, [searchParams, setSearchParams])

    useEffect(() => {
        sessionStorage.removeItem("timer")
        sessionStorage.removeItem("currentIndex")
        sessionStorage.removeItem("timer")
        sessionStorage.removeItem("timer")
    }, [])

    const getPercentageColor = (percentage) => {
        if (percentage >= 80) return "bg-green-500"
        if (percentage >= 60) return "bg-yellow-500"
        return "bg-red-500"
    }

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}m ${remainingSeconds}s`
    }

    const calculateTimeTaken = (startTime, updatedAt) => {
        const start = new Date(startTime).getTime()
        const end = new Date(updatedAt).getTime()
        return formatDuration(Math.floor((end - start) / 1000))
    }

    if (isPending) {
        return <Loader />
    }
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10xl mx-auto">
                <Card className="w-full max-w-10xl mx-auto my-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Test Natijalari</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {paginatedData.length === 0 ? (
                            <p className="text-lg text-center text-gray-500">
                                Hozircha hech qanday natijalar mavjud emas
                            </p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Mavzu</TableHead>
                                                <TableHead>Savollar</TableHead>
                                                <TableHead>{"To'g'ri javoblar"}</TableHead>
                                                <TableHead>Ball</TableHead>
                                                <TableHead>Nazorat turi</TableHead>
                                                <TableHead>Ketgan vaqt</TableHead>
                                                <TableHead>Sana</TableHead>
                                                <TableHead className="text-right">Amallar</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedData.map((item) => {
                                                const percentage = Math.round(
                                                    (item.result / item.questions.length) * 100
                                                )
                                                const timeTaken = calculateTimeTaken(item.startTime, item.updatedAt)
                                                return (
                                                    <TableRow
                                                        key={item._id}
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        <TableCell className="font-medium">
                                                            {item.subtopicname.join(", ")}
                                                        </TableCell>
                                                        <TableCell>{item.questions.length}</TableCell>
                                                        <TableCell>{item.result}</TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="secondary"
                                                                className={`${getPercentageColor(
                                                                    percentage
                                                                )} text-white hover:text-black cursor-default`}
                                                            >
                                                                {percentage}%
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.grade != null &&
                                                                `${item.grade}-sinf, ${item.term}-chorak, ${item.testType}`}
                                                            {item.testType === "attestatsiya" &&
                                                                item.testType.toUpperCase()}
                                                            {item.testType === "abituriyent" &&
                                                                item.testType.toUpperCase()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {timeTaken}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(item.createdAt).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className="flex flex-col lg:flex-row justify-end text-center">
                                                            <Button variant="outline" size="sm" className={``} asChild>
                                                                <Link to={`/results/${item._id}`}>
                                                                    <Eye className="w-4 h-4" />
                                                                    Ko'rmoq
                                                                </Link>
                                                            </Button>
                                                            {/* <DownloadResult
                                                                subTopicNames={item.subtopicname.join(", ")}
                                                                time={timeTaken}
                                                                result={percentage}
                                                                email={user.email}
                                                                userName={user.name}
                                                                questionLength={item.questions.length}
                                                            /> */}
                                                            {/*<Sertificate*/}
                                                            {/*    userName={user.name}*/}
                                                            {/*    result={percentage.toString()}*/}
                                                            {/*    subtopics={item.subtopicname.join(", ")}*/}
                                                            {/*/>*/}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                <PaginationComponent
                    isNext={isNext}
                    pageNumber={searchParams.get("page") ? searchParams.get("page") : 1}
                />
            </div>
        </div>
    )
}

export default ResultsPage
