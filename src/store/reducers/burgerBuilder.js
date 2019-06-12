import * as types from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
    ingredients: null,
    price: 4,
    isError: false,
    isBuilding: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat:  1.3,
};

const addIngredient = (state, action) => {
    const ingredient = action.ingredient;

    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] + 1,
        },
        price: state.price + INGREDIENT_PRICES[ingredient],
        isBuilding: true,
    });
};

const removeIngredient = (state, action) => {
    const ingredient = action.ingredient;

    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [ingredient]: state.ingredients[ingredient] - 1,
        },
        price: state.price - INGREDIENT_PRICES[ingredient],
        isBuilding: true,
    });
};

export default (state = initialState, action) => {
    switch (action.type) {
    case (types.SET_ERROR): 
        return updateObject(state, {isError: action.isError})
    case (types.ADD_INGREDIENT):
        return addIngredient(state, action);
    case (types.REMOVE_INGREDIENT):
        return removeIngredient(state, action);
    case (types.SET_INGREDIENTS):
        return updateObject(state, {ingredients: action.ingredients, isError: false, isBuilding: false});
    case (types.SET_TOTAL_PRICE):
        return updateObject(state, {price: action.price})
    default:
        return state
    }
};