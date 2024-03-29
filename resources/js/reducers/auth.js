import { SET_CURRENT_USER } from "../helpers/constant";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: action.user != null,
                user: action.user
            };
        default: return state;
    }
}

