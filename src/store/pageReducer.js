

const initState = {
    openSearchModal: false,
    openCartModal: false
}

const TOGGLE_SEARCH_MODAL = 'page/toggleSearch'
const TOGGLE_CART_MODAL = 'page/toggleCart'

export const toggleSearchDrawerAction = () => ({type: TOGGLE_SEARCH_MODAL})
export const toggleCartDrawerAction = () => ({type: TOGGLE_CART_MODAL})


export default function pageReducer(state = initState, action) {
    switch(action.type){
        case TOGGLE_SEARCH_MODAL:
            return {
                ...state,
                openSearchModal: !state.openSearchModal
            }
        case TOGGLE_CART_MODAL:
            return {
                ...state,
                openCartModal: !state.openCartModal
            }
    }
    return state
}