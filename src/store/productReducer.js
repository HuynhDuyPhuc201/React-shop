import productService from "../services/product.service"
import { createThunkAction } from "../utils/createThunkAction"


const initState = {
    categories: null
}
const SET_CATEGORY = 'product/setCategory'

export const getCategoryAction = createThunkAction(async (data, dispatch) =>{
    try {
        const res = await productService.getCategories()
        dispatch(setCategoryAction(res))
    } catch (error) {
        console.error(error)
    }
})


export  const setCategoryAction = (data) => (
    {
        type: SET_CATEGORY,
        payload: data
    }
)

export default function productReducer(state = initState, action) {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categories: action.payload 
            }
        default:
            return state
    }
}