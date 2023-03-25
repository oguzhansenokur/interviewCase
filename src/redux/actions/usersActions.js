import { ActionTypes } from "../actionTypes/action-types"

export const setUsers = (users) => {
    return {
        type:ActionTypes.GET_USERS,
        payload: users
    }
}