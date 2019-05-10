import * as types from '../constants';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0,
    },
    price: 4,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat:  1.3,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case (types.SET_INGREDIENTS):
        return {
            ...state,
            ingredients: payload,
        }     
    case (types.SET_TOTAL_PRICE):
        return {
            ...state,
            price: payload,
        }
    case (types.ADD_INGREDIENT):
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [payload]: state.ingredients[payload] + 1,
            },
            price: state.price + INGREDIENT_PRICES[payload],
        }
    case (types.REMOVE_INGREDIENT):
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [payload]: state.ingredients[payload] - 1,
            },
            price: state.price - INGREDIENT_PRICES[payload],
        }
    default:
        return state
    }
};