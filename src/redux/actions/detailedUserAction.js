import { ActionTypes } from "../actionTypes/action-types"

export const setDetailedUser = (detailedUser) => {
    return {
        type:ActionTypes.DETAILED_USER,
        payload: detailedUser
    }
}