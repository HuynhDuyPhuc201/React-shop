import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsync, useReduxAction } from "../core/hooks"
import { getCategoryAction } from "../store/productReducer"


export const useCategory = () =>{
    const { categories } = useSelector(store => store.product)
    const dispatch = useDispatch()
    const { action, loading: categoriesLoading } = useReduxAction(getCategoryAction)

    useEffect(() =>{
        if(categories === null){
            dispatch(getCategoryAction())
        }
    }, [categories])

    return {
        categories, categoriesLoading
    }
}