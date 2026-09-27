import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader.jsx";
import {useParams} from "react-router-dom";
import AddTopicsPage from "@/components/pages/AddTopicsPage.jsx";

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
    const {grade, questionType} = useParams()
    const {data, isPending} = useQuery({queryFn:()=>fetchData(grade, questionType), queryKey:["test/getfulltestdb-by-id", grade, questionType]})
    if (isPending){
        return <Loader />
    }
    return (
        <AddTopicsPage data={data} grade={grade} questionType={questionType===undefined?"multiple-choice":questionType} />
    );
}

export default EachGradeAddTopic;