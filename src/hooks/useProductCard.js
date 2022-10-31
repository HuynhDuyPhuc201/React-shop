import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../config/path";
import { useAsync } from "../core/hooks";
import profileService from "../services/profile.service";
import { addCartAction } from "../store/cartReducer";
import { useAuth } from "./useAuth";
import { useMainContext } from "./usePage";



export const useProductCard = (data = '') =>{

    const { setOpenPopupModal } = useMainContext();

    const [ loading, setLoading ] = useState(false)
  
    const { excute: addWishlist} = useAsync(profileService.addWishlist)

  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuth()
   
    
    const addProduct = () =>{
        if(user){
            let id = data.id
            let name = data.name
            setLoading(true)
            dispatch(addCartAction({
                id,
                success: () =>{
                    message.success(`Thêm sản phẩm ${name} vào giỏ hàng thành công`)
                },
                finally: () =>{
                    setLoading(false)
                }
            }))
        }else{
            navigate(path.Auth)
            setOpenPopupModal(false)
        }
    }

    const onAddWishList = async () =>{
        if(user){
            let _id = data._id
            let name = data.name
            try {
                await addWishlist(_id)
                message.success(`Thêm sản phẩm ${name} vào mục yêu thích thành công`)
            } catch (error) {
                message.error(error)
            }
        }else{
            navigate(path.Auth)
            setOpenPopupModal(false)
        }
    }

    return{
        addProduct,
        onAddWishList,
        loading,
    }
}