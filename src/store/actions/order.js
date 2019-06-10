import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        data: orderData,
    }
};

const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAILURE,
        error
    }
};

const purchaseBurger = () => {
    return {
        type: actionTypes.PURCHASE_BURGER,
    }
};

export const submitOrderForm = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurger());

        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(resp => {
                dispatch(purchaseBurgerSuccess());
            })
            .catch(error => dispatch(purchaseBurgerFailure(error)));
    }
};

export const initPurchaseOrder = () => {
    return {
        type: actionTypes.INIT_PURCHASE_ORDER,
    }
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders,
    }
};

const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error
    }
};

const fetchOrders = () => {
    return {
        type: actionTypes.FETCH_ORDERS
    }
};

export const initOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrders());
        
        axios.get(`/orders.json?auth=${token}`)
            .then(response => {
                const orders = [ ...Object.values(response.data)];
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => dispatch(fetchOrdersFailure(error)));
    }
};
