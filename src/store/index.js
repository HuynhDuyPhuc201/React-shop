import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import pageReducer from './pageReducer'
import thunk from 'redux-thunk'
import authReducer from "./authReducer";
import userReducer, { getUserInfoAction } from "./userReducer";
import cartReducer, { getCartAction } from "./cartReducer";
import productReducer from "./productReducer";

const reducers = combineReducers({ 
    page: pageReducer, 
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
})

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? 
window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
store.dispatch(getUserInfoAction())
store.dispatch(getCartAction())

export default store