import * as actionType from './strings'
import { AppState } from './types';

const fromLocalDataJSON = localStorage.getItem("archive");
const initState:AppState = fromLocalDataJSON == null ? {
    archive: []
} : JSON.parse(fromLocalDataJSON)

const reduce = (state:AppState, action: any) => {
    switch (action.type) {
        case actionType.ADD_ARCHIVE:
        return {
            ...state,
            data: [...state.archive, action.payload]
          };
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