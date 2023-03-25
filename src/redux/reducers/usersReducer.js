import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    users: []
}

export const usersReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.GET_USERS:
            return {...state, users:payload};
        default:
            return state;
    }

}