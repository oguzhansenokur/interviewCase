import { ActionTypes } from "../actionTypes/action-types"

const initialState = {
    detailedUser: 0
}

export const detailedUserReducer = (state=initialState, {type,payload}) => {
    switch(type) {
        case ActionTypes.DETAILED_USER:
            return {...state, detailedUser: payload};
        default:
            return state;
    }

}