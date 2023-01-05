import { USER_LIST } from "../types"

export const fetchUsers = (user) => (dispatch) => {
    dispatch(load());
    const users = JSON.parse(localStorage.getItem("accounts"));
    // eslint-disable-next-line array-callback-return
    users.map((item) => {
        if (JSON.stringify(item.Email) === JSON.stringify(user.Email) && JSON.stringify(item.Password) === JSON.stringify(user.Password)){
            console.log("access!");
            localStorage.setItem('isLoggedIn', true)
            dispatch(success(item));
        }
        else{
            dispatch(error("Error in fetching users"));
        }
    });
}

export const loggedOut = () => (dispatch) => {
    dispatch(success(''));
    dispatch(error(''));
    localStorage.setItem('isLoggedIn', false)
}

export const load = () => ({
    type: USER_LIST.load
})

export const success = (data) => ({
    type: USER_LIST.success, 
    payload: data
})

export const error = (error) => ({
    type: USER_LIST.error,
    payload: error
})