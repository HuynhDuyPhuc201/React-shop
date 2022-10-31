import { getToken, getUser, setUser } from "../core/utils"
import userService from "../services/user.service"

const initState = {
    user: getUser()
}

const SET_USER = 'user/setUser'

export const setUserAction = (user) => ({ type: SET_USER, payload: user })

export const getUserInfoAction = () =>{
    return  async (dispatch) => {
        try {
            if(getToken()){
                const user = await userService.getUser()

                setUser(user.data)
                dispatch(setUserAction(user.data))
            }
            
        } catch (error) {
            console.error(error);
        }
    }
}

export default function userReducer(state = initState, action){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default: return state
    }
}