import { useEffect, useState } from "react"
import { Loader2, Trash, EllipsisVertical, MoveRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast.js"
import { Card } from "@/components/ui/card.jsx"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/components/ui/Loader.jsx"
import PaginationComponent from "../shared/pagination"
import { pageSize } from "@/lib/constants"

const fetchUsers = async (page) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/user/get-users?pageSize=${pageSize}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    if (!res.ok) {
        throw new Error("Failed to fetch users")
    }
    return res.json()
}

const useUsers = (user, page) => {
    return useQuery({
        queryKey: ["users", page, pageSize],
        queryFn: () => fetchUsers(page),
        select: (data) => {
            if (!user) return []
            if (user.role === "admin") {
                return { people: data.people.filter((user) => user.role === "user"), isNext: data.isNext }
            } else if (user.role === "bosh admin") {
                return { people: data.people.filter((user) => user.role !== "bosh admin"), isNext: data.isNext }
            }
            return { people: data.people, isNext: data.isNext }
        },
        enabled: !!user // Only fetch when user exists
    })
}
function UsersPage() {
    const [allUsers, setAllUsers] = useState([])
    const [loadingUserId, setLoadingUserId] = useState(null)
    const [role, setRole] = useState(null)
    const { toast } = useToast()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") || 1)
    const { data: { people: fetchedUsers, isNext } = {}, isLoading } = useUsers(user, page)
    if (user.role === "user") {
        navigate("/home")
    }
    useEffect(() => {
        // navigate('?page=1')
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" }, { replace: true })
        }
    }, [searchParams, setSearchParams])
    useEffect(() => {
        if (fetchedUsers) {
            setAllUsers(fetchedUsers)
        }
    }, [fetchedUsers])

    useEffect(() => {
        if (user) {
            setRole(user.role)
        }
    }, [user])

    const handleDelete = async (userId) => {
        try {
            setLoadingUserId(userId)

            const res = await fetch(`${import.meta.env.VITE_SERVER}/user/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete user")
            }

            toast({
                title: data.msg,
                variant: "success"
            })

            let filteredUsers = []

            if (user.role === "admin") {
                filteredUsers = data.allUsers.filter((person) => person.role === "user")
            } else if (user.role === "bosh admin") {
                filteredUsers = data.allUsers.filter((person) => person.role !== "bosh admin")
            }

            setAllUsers(filteredUsers)
        } catch (error) {
            toast({
                title: error.message,
                variant: "destructive"
            })
        } finally {
            setLoadingUserId(null)
        }
    }
    const roleToUser = async (userEmail) => {
        setLoadingUserId(userEmail)
        await fetch(`${import.meta.env.VITE_SERVER}/user/role-to-user/`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail
            })
        })
            .then((res) => res.json())
            .then((data) => {
                toast({
                    title: data.msg,
                    variant: "success",
                    duration: 4000
                })
                setLoadingUserId(null)
                let filteredUsers = []
                if (user.role === "admin") {
                    filteredUsers = data.newData.filter((user) => user.role === "user")
                } else if (user.role === "bosh admin") {
                    filteredUsers = data.newData.filter((user) => user.role !== "bosh admin")
                }
                setAllUsers(filteredUsers)
            })
    }
    const roleToAdmin = async (userEmail) => {
        setLoadingUserId(userEmail)
        await fetch(`${import.meta.env.VITE_SERVER}/user/role-to-admin/`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail
            })
        })
            .then((res) => res.json())
            .then((data) => {
                toast({
                    title: data.msg,
                    variant: "success",
                    duration: 4000
                })
                setLoadingUserId(null)
                let filteredUsers = []
                if (user.role === "admin") {
                    filteredUsers = data.newData.filter((user) => user.role === "user")
                } else if (user.role === "bosh admin") {
                    filteredUsers = data.newData.filter((user) => user.role !== "bosh admin")
                }
                setAllUsers(filteredUsers)
            })
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {allUsers && (
                        <>
                            <Table className={`bg-white  rounded-lg shadow-lg`}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ism</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Rol</TableHead>
                                        <TableHead>Yaratilgan sanasi</TableHead>
                                        <TableHead className="text-right">Amallar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allUsers.length > 0 &&
                                        allUsers.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.role}</Badge>
                                                </TableCell>
                                                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {(loadingUserId === user._id ||
                                                            loadingUserId === user.email) && (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        <Button
                                                            size={"icon"}
                                                            onClick={() => handleDelete(user._id)}
                                                            variant={"outline"}
                                                            disabled={loadingUserId === user._id}
                                                        >
                                                            <Trash className=" h-4 w-4" />
                                                        </Button>
                                                        {role === "bosh admin" && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                    <Button size={"icon"} variant={"outline"}>
                                                                        <EllipsisVertical className={`h-7 w-7`} />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    {/*<DropdownMenuLabel>.....test</DropdownMenuLabel>*/}
                                                                    {/*<DropdownMenuSeparator />*/}
                                                                    {user.role === "user" && (
                                                                        <DropdownMenuItem
                                                                            onClick={() => roleToAdmin(user.email)}
                                                                        >
                                                                            User <MoveRight /> Admin
                                                                        </DropdownMenuItem>
                                                                    )}

                                                                    {role === "bosh admin" && user.role === "admin" && (
                                                                        <DropdownMenuItem
                                                                            onClick={() => roleToUser(user.email)}
                                                                        >
                                                                            Admin <MoveRight /> User
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    {allUsers.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Foydalanuvchi topilmadi
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </Card>
                <PaginationComponent
                    isNext={isNext}
                    pageNumber={searchParams.get("page") ? searchParams.get("page") : 1}
                />
            </div>
        </div>
    )
}

export default UsersPage
