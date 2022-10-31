import { useSelector } from "react-redux"



export const useCategoryDetail = (id) =>{
    const { categories } = useSelector(store => store.product) 

    if(id){
        return categories?.find(e => e.id == id)
    }

    return null
}