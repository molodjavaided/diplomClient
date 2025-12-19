import { ACTION_TYPE } from "../actions/actions-type";

const initialState = {
    isLoading: false,
    error: null
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case ACTION_TYPE.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case ACTION_TYPE.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};