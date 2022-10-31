import { useState } from "react"
import { useEffect } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"


export const useSearch = (name, defaultValue) =>{
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [ value, setValue] = useState(() =>{
        return searchParams.get(name) || defaultValue
    })

    useEffect(() =>{
        if(value){
            searchParams.set(name, value)
        }else{
            searchParams.delete(name)
        }

        navigate(`${pathname}?${searchParams.toString()}`)

    },[value])


    return [value, setValue]
}