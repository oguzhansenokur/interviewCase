import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    updateModalVisible: false
}

export const updateModalReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.UPDATE_MODAL_V:
            return {...state, updateModalVisible: payload};
        default:
            return state;
    }

}