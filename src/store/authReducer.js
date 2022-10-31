import { useNavigate } from "react-router-dom"
import { setToken, getUser, setUser, clearUser, clearToken } from "../core/utils"
import authService from "../services/auth.service"
import userService from "../services/user.service"
import { getUserInfoAction, setUserAction } from "./userReducer"

const initState = {
    // user: getUser()
}

const AUTH_LOGIN = 'auth/login';
const AUTH_LOGOUT = 'auth/logout';


export const loginAction = (data) =>{
    return async (dispatch) =>{
        try {
            const token = await authService.login(data.form)
            setToken(token.data)

            // dispatch(getUserInfoAction)

            const user = await userService.getUser()
            setUser(user.data)
            
            dispatch({ type: AUTH_LOGIN, payload: user.data })
            dispatch(setUserAction(user.data))

        } catch (err) {
            data.error(err)
        }
    }
}

export const logoutAction = () => {
    return {
        type: AUTH_LOGOUT,
    }
}

export const registerAction = (data) =>{
    return async (dispatch) =>{
        try {
            await authService.register(data.form)

            dispatch(loginAction({
                form: data.form,
                success: data.success,
                error: data.error
            }))

        } catch (err) {
            data.error(err)
        }
    }
}

export default function authReducer(state = initState, action){
    switch(action.type){
        default:
            return state
    }
}

