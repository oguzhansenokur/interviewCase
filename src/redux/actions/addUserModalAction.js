import { ActionTypes } from "../actionTypes/action-types"

export const setAddUserModalAction = (addUserModal) => {
    return {
        type:ActionTypes.ADD_USER_MODAL_V,
        payload: addUserModal
    }
}