import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    viewModalVisible: false
}

export const viewModalReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.VIEW_MODAL_V:
            return {...state, viewModalVisible: payload};
        default:
            return state;
    }

}