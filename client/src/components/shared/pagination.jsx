import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../ui/button"

const PaginationComponent = ({ isNext, pageNumber }) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const onNavigation = (direction) => {
        const nextPageNumber = direction === "prev" ? +pageNumber - 1 : +pageNumber + 1

        navigate("?page=" + nextPageNumber)
    }

    if (!isNext && +pageNumber === 1) return null
    return (
        <Pagination className={"my-5"}>
            <PaginationContent>
                <PaginationItem>
                    <Button size="sm" onClick={() => onNavigation("prev")} disabled={searchParams.get("page") === "1"}>
                        Oldingisi
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className="cursor-pointer" size="sm" isActive>
                        {searchParams.get("page")}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <Button size="sm" onClick={() => onNavigation("next")} disabled={!isNext}>
                        Keyingisi
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
