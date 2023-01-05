import { SELECTED_FACTORY } from "../types"

export const selectFactory = (factory) => (dispatch) => {
    dispatch(select(factory));
}


export const select = (factory) => ({
    type: SELECTED_FACTORY.selected,
    payload: factory
})
