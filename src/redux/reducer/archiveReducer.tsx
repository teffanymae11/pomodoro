import * as actionType from '../strings'
import { AppState } from '../types';
import { TaskVars } from '../../components/dashboard/types';

const archiveData = localStorage.getItem("archive");
const initArchive: AppState = archiveData == null ? [] : JSON.parse(archiveData)

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

const archive = (state: AppState = initArchive, action: any) => {
    const newState: AppState = reduce(state, action);
    localStorage.setItem("archive", JSON.stringify(newState));
    return newState;
}

export default archive;