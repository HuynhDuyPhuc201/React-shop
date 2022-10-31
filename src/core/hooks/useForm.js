import { useState } from "react"
import {validate} from "../utils/validate"


export const useForm = (rules, initialValue = {}) =>{
    const [form, setForm] = useState(initialValue)
    const [error, setError] = useState({})

    const _validate = () =>{
        const errorObj = validate(form, rules)

        setError(errorObj)
        return Object.keys(errorObj).length === 0
    }

    const register = (name) =>{
        // return {
        //     defaultValue: form[name],
        //     onChange: (e) => form[name] = e.currentTarget.value,
        //     error: error[name],
        //     name
        // }
        return{
            defaultValue: form[name],
            onChange: (e) => {
                form[name] = e.currentTarget.value
                setForm({...form})
            },
            error: error[name]
        }
    }

    return {
        form, 
        setForm,
        setError,
        error,
        validate: _validate,
        register
    }
}