import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        data: orderData,
    }
}

const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAILURE,
        error
    }
}

const purchaseBurger = () => {
    return {
        type: actionTypes.PURCHASE_BURGER,
    }
}

export const submitOrderForm = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurger());

        axios.post('/orders.json', orderData)
            .then(resp => {
                dispatch(purchaseBurgerSuccess());
            })
            .catch(error => dispatch(purchaseBurgerFailure(error)));
    }
}

export const initPurchaseOrder = () => {
    return {
        type: actionTypes.INIT_PURCHASE_ORDER,
    }
}
