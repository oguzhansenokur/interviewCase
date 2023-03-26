import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    lastDeletedUserId: 0
}

export const addLastDeletedUserId = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.LAST_DELETED_USER:
            return {...state, lastDeletedUserId: payload};
        default:
            return state;
    }

}