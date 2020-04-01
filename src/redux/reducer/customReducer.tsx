import * as actionType from '../strings'
import { CustomVars } from '../../components/dashboard/types';

const customData = localStorage.getItem("custom");
const initCustom: CustomVars = customData == null ?
    { pomodoro: 25, short: 3, long: 15, longTrigger: 4 }
    : JSON.parse(customData)

const reduce = (state: CustomVars, action: any) => {
    let val = action.payload

    switch (action.type) {
        case actionType.UPDATE_CUSTOM:
            return { ...state, pomodoro: val.pomodoro, short: val.short, long: val.long, longTrigger: val.longTrigger }

        case actionType.CHANGE_CUSTOM:
            return { ...state, [val.target.name]: parseInt(val.target.value) }
        default:
            return state;
    }
};

const customReducer = (state: CustomVars = initCustom, action: any) => {
    const newState: CustomVars = reduce(state, action);
    localStorage.setItem("custom", JSON.stringify(newState));
    return newState;
}

export default customReducer;