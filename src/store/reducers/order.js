import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    case (actionTypes.PURCHASE_BURGER):
        return { ...state, isLoading: true};
    case (actionTypes.PURCHASE_ORDER_SUCCESS):
        return { ...state, isLoading: false };
    case (actionTypes.PURCHASE_ORDER_FAILURE):
        return { ...state, isLoading: false};
    default:
        return state
    }
}
