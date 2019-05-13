import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient,
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients,
    }
}

const setPrice = (price) => {
    return {
        type: actionTypes.SET_TOTAL_PRICE,
        price
    }
}

export const setError = (isError) => {
    return {
        type: actionTypes.SET_ERROR,
        isError,
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then(response => {
                const fetchedIngredients = { ...response.data };
                dispatch(setIngredients(fetchedIngredients));
            })
            .catch(error => {
                dispatch(setError(true));
            });
        axios.get('/price.json')
            .then(response => {
                dispatch(setPrice(response.data));
            })
            .catch(error => {
                dispatch(setError(true));
            });
}}