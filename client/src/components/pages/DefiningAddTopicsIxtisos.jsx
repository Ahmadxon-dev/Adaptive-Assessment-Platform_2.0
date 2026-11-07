import { IXTISOS_GRADES } from '@/lib/constants'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const DefiningAddTopicsIxtisos = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.role === "user") {
            navigate("/home")
        }
    }, [])
  return (
    <div className="bg-gray-100 h-screen">
            <div className="space-y-10 pt-20">
                <p className="text-3xl font-bold text-center text-gray-900">Savollarni Qo'shish</p>
                <div className="flex justify-evenly">
                    {
                        IXTISOS_GRADES.map(element => {
                            return <Button asChild key={element} className={`px-8 py-3 pb-4 text-2xl`}>
                                <Link to={`${element}`}>
                                    {element}-sinf
                                </Link>
                            </Button>
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default DefiningAddTopicsIxtisos