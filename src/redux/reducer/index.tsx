import { combineReducers } from "redux";
import archive from './archiveReducer'
import taskList from './taskListReducer'

const reducer = combineReducers({
    archive,
    taskList,
})

export default reducer