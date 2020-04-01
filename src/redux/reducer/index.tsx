import { combineReducers } from "redux";
import archiveReducer from './archiveReducer'
import taskListReducer from './taskListReducer'
import todoReducer from './todoReducer'
import taskReducer from './taskReducer'

const reducer = combineReducers({
    archiveReducer,
    taskListReducer,
    todoReducer,
    taskReducer,
})

export default reducer