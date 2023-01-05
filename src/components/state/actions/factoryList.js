import { FACTORY_LIST } from "../types"

export const fetchFactories = () => (dispatch) => {
    dispatch(load());
    const data = localStorage.getItem("factory");
    if (data){
        const factories = JSON.parse(data);
        dispatch(success(factories));
    }
    else{
        dispatch(error('Faield to Fetch'))
    }
}

export const load = () => ({
    type: FACTORY_LIST.load
})

export const success = (data) => ({
    type: FACTORY_LIST.success, 
    payload: data
})

export const error = (error) => ({
    type: FACTORY_LIST.error,
    payload: error
})