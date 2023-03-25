import { ActionTypes } from "../actionTypes/action-types"

export const setUpdateModalVisibility = (updateModalVisible) => {
    return {
        type:ActionTypes.UPDATE_MODAL_V,
        payload: updateModalVisible
    }
}