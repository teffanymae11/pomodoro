import * as actionType from '../strings'
import { TaskVars } from '../../components/dashboard/types';

const taskData = localStorage.getItem("task");
const initTask: TaskVars = taskData == null ? { title: '', notes: '', favorite: false } : JSON.parse(taskData)

const reduce = (state: TaskVars, action: any) => {
    let val = action.payload

    switch (action.type) {
        case actionType.ADD_TASK:
            return { ...state, title: '', notes: '' };

        case actionType.UPDATE_TASK:
            return { ...state, title: val.title, notes: val.notes, favorite: val.favorite }

        default:
            return state;
    }
};

const taskReducer = (state: TaskVars = initTask, action: any) => {
    const newState: TaskVars = reduce(state, action);
    localStorage.setItem("task", JSON.stringify(newState));
    return newState;
}

export default taskReducer;