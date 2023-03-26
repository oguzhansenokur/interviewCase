import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    deleteUserId: 0
}

export const deleteUserReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.DELETE_USER_ID:
            return {...state, deleteUserId: payload};
        default:
            return state;
    }

}