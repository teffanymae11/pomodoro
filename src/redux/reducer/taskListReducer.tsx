import * as actionType from '../strings'
import { AppState } from '../types';

const taskListData = localStorage.getItem("tasklist");
const initTaskList: AppState = taskListData == null ? {} : JSON.parse(taskListData)

const reduce = (state: AppState, action: any) => {
    switch (action.type) {
        case actionType.TASK_LIST:
            return action.payload;
        default:
            return state;
    }
};

const taskListReducer = (state: AppState = initTaskList, action: any) => {
    const newState: AppState = reduce(state, action);
    localStorage.setItem("tasklist", JSON.stringify(newState));
    return newState;
}

export default taskListReducer;