import { FACTORY_LIST } from "../types"

const initialState = {
    load: false,
    data: "",
    error: ""
}

export const factoryListReducer = (state = initialState, action) => {
    switch (action.type){
        case FACTORY_LIST.load:
            return{
                ...state, load: true
            }
        case FACTORY_LIST.success:
            return{
                ...state, data: action.payload, load: false
            }
        case FACTORY_LIST.error:
            return{
                ...state, error: action.payload, load: false
            }
        default: return state
    }
}