import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    deleteModal: false
}

export const deleteModalReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.DELETE_MODAL_V:
            return {...state, deleteModal: payload};
        default:
            return state;
    }
}