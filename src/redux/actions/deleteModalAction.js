import { ActionTypes } from "../actionTypes/action-types"

export const deleteModalAction = (deleteModal) => {
    return {
        type:ActionTypes.DELETE_MODAL_V,
        payload: deleteModal
    }
}