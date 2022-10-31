import api from '../config/api'

const orderService = {
    getDetail(id){
        return api.get(`/ecommerce/v1/order/${id}`)
    },
    getList(query = ''){
        return api.get(`/ecommerce/v1/order${query}`)
    },
    reOrder(id){
        return api.post(`/ecommerce/v1/order/re-order/${id}`)
    },
   
}

export default orderService