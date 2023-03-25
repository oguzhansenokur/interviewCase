import { ActionTypes } from "../actionTypes/action-types"

export const setAddTodoModalAction = (addTodoModal) => {
    return {
        type:ActionTypes.ADD_TODO_MODAL_V,
        payload: addTodoModal
    }
}