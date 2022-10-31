import api from "../config/api"

const profileService = {
    getWishlist(query = ''){
        return api.get('/ecommerce/v1/profile/wishlist' + query)
    },
    addWishlist(id){
        return api.post(`/ecommerce/v1/profile/wishlist/${id}`)
    },
    removeWishlist(id){
        return api.delete(`/ecommerce/v1/profile/wishlist/${id}`)
    },


    getAddress(id){
        return api.get(`/ecommerce/v1/profile/address${id ? `/${id}` : ''}`)
    },
    getAddressDefault(){
        return api.get(`/ecommerce/v1/profile/address/default`)
    },
    addAddress(data){
        return api.post(`/ecommerce/v1/profile/address`, data)
    },
    editAddress(id, data){
        return api.put(`/ecommerce/v1/profile/address/${id}`, data)
    },
    deleteAddress(id){
        return api.delete(`/ecommerce/v1/profile/address/${id}`)
    },
}

export default profileService