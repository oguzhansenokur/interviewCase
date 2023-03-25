import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import {updateModalReducer} from './updateModalReducer'
import { viewModalReducer } from "./viewModalReducer";
import { detailedUserReducer } from "./detailedUserReducer";
import {addUserReducer} from './addUserReducer'
import { addTodoReducer } from "./addTodoReducer";

 const reducers = combineReducers( {
    allUsers:usersReducer,
    updateModalV:updateModalReducer,
    viewModalV:viewModalReducer,
    detailedUserID:detailedUserReducer,
    addUserModalV:addUserReducer,
    addTodoModalV:addTodoReducer
})

export default reducers