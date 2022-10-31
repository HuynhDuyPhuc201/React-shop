import { useEffect, useState } from "react"

export const useAsync = (promise, imedia = false) =>{
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(imedia){
            excute()
        }
    }, [])

    const excute = async (...rest) =>{
        try {
            setLoading(true)
            setError('')
            const res = await promise(...rest)
            return res
        } catch (err) {
            setError(err.message || err.error)
            throw err.message || err.error
        }finally{
            setLoading(false)
        }
    }

    return {
        excute, loading, error
    }
}