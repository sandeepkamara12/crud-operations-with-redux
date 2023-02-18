const initialState = {
    items: [],
    item: {}
}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS': return {
            ...state,
            items: action.payload
        }
        case 'SINGLE_USER': return {
            ...state,
            item: action.payload
        }
        case 'ADD_USER': return {
            ...state,
            item: action.payload
        }
        case 'UPDATE_USER': return {
            ...state,
            item: action.payload
        }
        case 'SEARCH_USER': return {
            ...state,
            items: action.payload
        }
        default: return state;
    }
}
export default postReducer;