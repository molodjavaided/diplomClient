import { ACTION_TYPE } from "./actions-type";

export const uiActions = {
    setLoading: (isLoading) => ({
        type: ACTION_TYPE.SET_LOADING,
        payload: isLoading
    }),

    setError: (error) => ({
        type: ACTION_TYPE.SET_ERROR,
        payload: error
    }),

    clearError: () => ({
        type: ACTION_TYPE.CLEAR_ERROR
    })
}