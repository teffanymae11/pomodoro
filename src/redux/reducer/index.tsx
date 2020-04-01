import { combineReducers } from "redux";

import customReducer from './customReducer'
import todoReducer from './todoReducer'
import taskReducer from './taskReducer'
import taskListReducer from './taskListReducer'
import archiveReducer from './archiveReducer'

const reducer = combineReducers({
    customReducer,
    todoReducer,
    taskReducer,
    taskListReducer,
    archiveReducer,

})

export default reducer