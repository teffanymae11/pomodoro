import * as actionType from './strings'
import { AppState } from './types';
import { TaskVars } from '../components/dashboard/types';

const fromLocalDataJSON = localStorage.getItem("archive");
const initState: AppState = fromLocalDataJSON == null ? [] : JSON.parse(fromLocalDataJSON)

const reduce = (state: AppState, action: any) => {
    switch (action.type) {
        case actionType.ADD_ARCHIVE:
            return [...state, action.payload];

        case actionType.DELETE_ARCHIVE:
            localStorage.removeItem("archive");
            let arc = [...state]
            return arc.filter((val: TaskVars) => val !== action.payload)
        default:
            return state;
    }
};

const reducer = (state: AppState = initState, action: any) => {
    const newState: AppState = reduce(state, action);
    localStorage.setItem("archive", JSON.stringify(newState));
    return newState;
}

export default reducer;