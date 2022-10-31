import api from '../config/api'

const productService = {
    getProduct(query = ''){
        return api.get(`/product${query}`)
    },
    getProductDetail(id){
        return api.get(`/product/${id}`)
    },
    getSearchResult(name){
        return api.get(`/product?name=${name}&limit=3`)
    },
    getCategories(){
        return api.get(`/categories`)
    },
}

export default productService