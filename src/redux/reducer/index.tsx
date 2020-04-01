import { combineReducers } from "redux";
import archiveReducer from './archiveReducer'
import taskListReducer from './taskListReducer'

const reducer = combineReducers({
    archiveReducer,
    taskListReducer,
})

export default reducer