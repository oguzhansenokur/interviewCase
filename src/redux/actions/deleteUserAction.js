import { ActionTypes } from "../actionTypes/action-types"

export const setDeleteUserAction = (deleteUserId) => {
    return {
        type:ActionTypes.DELETE_USER_ID,
        payload: deleteUserId
    }
}