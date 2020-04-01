import { combineReducers } from "redux";
import archiveReducer from './archiveReducer'
import taskListReducer from './taskListReducer'
import todoReducer from './todoReducer'

const reducer = combineReducers({
    archiveReducer,
    taskListReducer,
    todoReducer
})

export default reducer