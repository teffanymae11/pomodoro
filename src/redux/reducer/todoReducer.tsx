import * as actionType from '../strings'
import { AppState } from '../types';
import { TaskVars } from '../../components/dashboard/types';

const taskData = localStorage.getItem("taskdata");
const initTask: AppState = taskData == null ? [] : JSON.parse(taskData)

const reduce = (state: AppState, action: any) => {
    let todoData = [...state]
    let val = action.payload

    switch (action.type) {
        case actionType.FILTER_TODO:
            const remove = todoData.filter((todo: TaskVars) => {
                if (val.title === todo.title && val.notes === todo.notes) {
                    localStorage.removeItem("taskdata");
                    return false;
                }
                return true;
            })
            return remove;

        case actionType.ADD_TODO:
            return [...state, val]

        case actionType.UPDATE_TODO:
            const taskEdit = todoData.filter((todo: TaskVars) => {
                if (todo === val.updating) {
                    todo.title = val.task.title;
                    todo.notes = val.task.notes;
                    todo.favorite = val.task.favorite;
                } return true;
            })

            localStorage.setItem("taskdata", JSON.stringify(taskEdit));
            return taskEdit

        case actionType.DRAG_TODO:
            return val

        case actionType.ADD_FAVORITE_TODO:
            localStorage.setItem("taskdata", JSON.stringify([...todoData, val]));
            return [...state, val]

        case actionType.FAVORITE_TODO:
            const taskFav = todoData.filter((todo: TaskVars) => {
                if (todo === val) {
                    todo.title = val.title;
                    todo.notes = val.notes;
                    todo.favorite = true;
                } return true;
            })

            localStorage.setItem("taskdata", JSON.stringify(taskFav));
            return taskFav

        case actionType.UNFAVORITE_TODO:
            const taskUnFav = todoData.filter((todo: TaskVars) => {
                if (todo === val) {
                    todo.title = val.title;
                    todo.notes = val.notes;
                    todo.favorite = false;
                } return true;
            })

            localStorage.setItem("taskdata", JSON.stringify(taskUnFav));
            return taskUnFav

        case actionType.REMOVE_TODO:
            localStorage.removeItem("taskdata");
            const removetask = todoData.filter((task: TaskVars) => val.title !== task.title || val.notes !== task.notes || val.favorite !== task.favorite);
            localStorage.setItem("taskdata", JSON.stringify(removetask));
            return removetask

        default:
            return state;
    }
};

const todoReducer = (state: AppState = initTask, action: any) => {
    const newState: AppState = reduce(state, action);
    localStorage.setItem("taskdata", JSON.stringify(newState));
    return newState;
}

export default todoReducer;