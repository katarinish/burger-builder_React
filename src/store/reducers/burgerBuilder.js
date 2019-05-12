import * as types from '../actions/actionTypes';

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

const addIngredient = (state, action) => {
    const ingredient = action.ingredient;

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] + 1,
        },
        price: state.price + INGREDIENT_PRICES[ingredient]
    }
}

const removeIngredient = (state, action) => {
    const ingredient = action.ingredient;

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] - 1,
        },
        price: state.price - INGREDIENT_PRICES[ingredient]
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
    case (types.ADD_INGREDIENT):
        return addIngredient(state, action);
    case (types.REMOVE_INGREDIENT):
        return removeIngredient(state, action);
    default:
        return state
    }
};