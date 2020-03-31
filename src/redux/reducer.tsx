import * as actions from './strings'

const reducer = (state = false, action: any) => {
    switch (action.type) {
        case actions.SIGN_IN:
            return !state;

        default:
            return state;
    }
};

export default reducer;