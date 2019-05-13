import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isPurchasing: false,
    orders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.INIT_PURCHASE_ORDER):
            return { ...state, isPurchasing: true};
        case (actionTypes.PURCHASE_BURGER):
            return { ...state, isLoading: true};
        case (actionTypes.PURCHASE_ORDER_SUCCESS):
            return { ...state, isLoading: false, isPurchasing: false };
        case (actionTypes.PURCHASE_ORDER_FAILURE):
            return { ...state, isLoading: false};
            
        case (actionTypes.FETCH_ORDERS):
            return { ...state, isLoading: true};
        case (actionTypes.FETCH_ORDERS_SUCCESS): 
            return { ...state, orders: [ ...action.orders], isLoading: false}
        case (actionTypes.FETCH_ORDERS_FAILURE): 
            return { ...state, isLoading: false};
        default:
            return state
    }
}
