import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AddTopicsPage from "@/components/pages/AddTopicsPage.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const fetchData = async (id, questionType)=>{
    if (id==="abituriyent" || id ==="attestatsiya"){
        const response = await fetch(`${import.meta.env.VITE_SERVER}/test/getfulltestdb-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        return response.json()
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER}/test/getfulltestdb-by-id/${id}/${questionType}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
    return response.json()
}
function EachGradeAddTopic() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)    
    useEffect(() => {
        if (user.role === "user") {
            navigate("/home")
        }
    }, [])
    const {classType, grade, questionType} = useParams()
    const {data, isPending} = useQuery({queryFn:()=>{
        if(classType === 'ixtisos-sinflar'){
            return fetchData(`ixtisos-${grade}`, questionType)
        }
        if(classType === 'standard'){
            return fetchData(grade, questionType)
        }
    }, queryKey:["test/getfulltestdb-by-id", grade, questionType, classType]})

    if (isPending){
        return <Loader />
    }
    return (
        <AddTopicsPage data={data} classType={classType} grade={grade} questionType={questionType===undefined?"multiple-choice":questionType} />
    );
}

export default EachGradeAddTopic;