import { useEffect, useState } from "react"

export const useQuery = (callbackPromise, dependencyList = []) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [paginate, setPaginate] = useState({})
    const [dataDetail, setDataDetail] = useState([])
    const [error, setError] = useState('')

    useEffect(() =>{
        excute()
    }, dependencyList)

    const excute = () =>{
        setLoading(true)
        callbackPromise()
            .then(res => {
                setData(res.data)
                setPaginate(res.paginate || {})
                setDataDetail(res)
            })
            .catch((err) =>{
                setError(err)
            })
            .finally(() =>{
                setLoading(false)
            })
    }
    return {
        data, loading, error, paginate, dataDetail, excute
    }
}
