import * as actionType from '../strings'
import { AppState } from '../types';

const taskListData = localStorage.getItem("taskList");
const initTaskList: AppState = taskListData == null ? {} : JSON.parse(taskListData)

const reduce = (state: AppState, action: any) => {
    switch (action.type) {
        case actionType.ADD_ARCHIVE:
            return state;

        case actionType.DELETE_ARCHIVE:
            return state
        default:
            return state;
    }
};

const taskList = (state: AppState = initTaskList, action: any) => {
    const newState: AppState = reduce(state, action);
    localStorage.setItem("taskList", JSON.stringify(newState));
    return newState;
}

export default taskList;