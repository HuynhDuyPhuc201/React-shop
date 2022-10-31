import { useState } from "react"

export const useReduxAction = (funAction) =>{
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const action = (data) =>{
        setLoading(true)
        return funAction({
            form: data,
            success: () => {
                setLoading(false)
            },
            error: (err) => {
                setLoading(false)
                setError(err.message || err.error)
            }
        })
    }

    return{
        error,
        loading,
        action
    }
}