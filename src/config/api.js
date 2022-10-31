
import axios from 'axios';
import { getToken, setToken } from '../core/utils';
import authService from '../services/auth.service';

// axios.defaults.baseURL = import.meta.env.VITE_API_HOST // 'http://cfd-reactjs.herokuapp.com'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_HOST
})

api.interceptors.request.use((config) => {

    let token = getToken()
    if (token){
        config.headers.Authorization = `Bearer ${token.accessToken}`
    }

    return config
})

let promiseRefreshToken = null

api.interceptors.response.use((res) => {
    if(res.data.data === null) throw { message: 'Not found' }
    return res.data

}, async (err) =>{
    const response = err.response.data

    /**
     * Kiểm tra xem có phải do Token hết hạn
     * refreshToken
     * gọi lại api bị thất bại
     */

    if(response.error_code === 'TOKEN_EXPIRED'){
        if(promiseRefreshToken){
            await promiseRefreshToken
        }else{
            const token = getToken()
            promiseRefreshToken = authService.refreshToken({ refreshToken: token.refreshToken})
            const accessToken = await promiseRefreshToken
            token.accessToken = accessToken.data.accessToken
            setToken(token)
        }
        promiseRefreshToken = null
        return api(err.config)

    }
    throw err.response.data
})

export default api