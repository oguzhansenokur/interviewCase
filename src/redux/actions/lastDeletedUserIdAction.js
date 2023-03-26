import { ActionTypes } from "../actionTypes/action-types"

export const lastDeletedUserIdAction = (lastDeletedUserId) => {
    return {
        type:ActionTypes.LAST_DELETED_USER,
        payload: lastDeletedUserId
    }
}