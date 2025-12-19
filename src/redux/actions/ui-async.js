import { uiActions } from "../actions/ui-actions";

export const setLoading = (isLoading) => (dispatch) => {
    dispatch(uiActions.setLoading(isLoading));
};

export const setError = (error) => (dispatch) => {
    dispatch(uiActions.setError(error));
};

export const clearError = () => (dispatch) => {
    dispatch(uiActions.clearError());
};