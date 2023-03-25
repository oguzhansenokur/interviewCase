import { ActionTypes } from "../actionTypes/action-types"

export const setViewModalVisibility = (viewModalVisible) => {
    return {
        type:ActionTypes.VIEW_MODAL_V,
        payload: viewModalVisible
    }
}