import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    addTodoModal: false
}

export const addTodoReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.ADD_TODO_MODAL_V:
            return {...state, addTodoModal: payload};
        default:
            return state;
    }

}