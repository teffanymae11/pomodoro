import * as actionType from '../strings'
import { AppState } from '../types';
import { TaskVars } from '../../components/dashboard/types';

const taskData = localStorage.getItem("taskdata");
const initTask: AppState = taskData == null ? [] : JSON.parse(taskData)

const reduce = (state: AppState, action: any) => {
    let todoData = [...state]

    switch (action.type) {
        case actionType.FILTER_TODO:
            const remove = todoData.filter((todo: TaskVars) => {
                if (action.payload.title === todo.title && action.payload.notes === todo.notes) {
                    localStorage.removeItem("taskdata");
                    return false;
                }
                return true;
            })
            return remove;

        case actionType.ADD_TODO:
            return [...state, action.payload]

        case actionType.UPDATE_TODO:
            const taskEdit = todoData.filter((todo: TaskVars) => {
                if (todo === action.payload.updating) {
                    todo.title = action.payload.task.title;
                    todo.notes = action.payload.task.notes;
                    todo.favorite = action.payload.task.favorite;
                } return true;
            })

            localStorage.setItem("taskdata", JSON.stringify(taskEdit));
            return taskEdit

        case actionType.DRAG_TODO:
            return action.payload

        case actionType.ADD_FAVORITE_TODO:
            localStorage.setItem("taskdata", JSON.stringify([...todoData, action.payload]));
            return [...state, action.payload]

        case actionType.FAVORITE_TODO:
            const taskFav = todoData.filter((todo: TaskVars) => {
                if (todo === action.payload) {
                    todo.title = action.payload.title;
                    todo.notes = action.payload.notes;
                    todo.favorite = true;
                } return true;
            })

            localStorage.setItem("taskdata", JSON.stringify(taskFav));
            return taskFav

            case actionType.UNFAVORITE_TODO:
                const taskUnFav = todoData.filter((todo: TaskVars) => {
                    if (todo === action.payload) {
                        todo.title = action.payload.title;
                        todo.notes = action.payload.notes;
                        todo.favorite = false;
                    } return true;
                })
    
                localStorage.setItem("taskdata", JSON.stringify(taskUnFav));
                return taskUnFav

        case actionType.REMOVE_TODO:
            localStorage.removeItem("taskdata");
            const removetask = todoData.filter((task: TaskVars) => action.payload.title !== task.title || action.payload.notes !== task.notes || action.payload.favorite !== task.favorite);
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