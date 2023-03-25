import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    addUserModal: false
}

export const addUserReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.ADD_USER_MODAL_V:
            return {...state, addUserModal: payload};
        default:
            return state;
    }

}