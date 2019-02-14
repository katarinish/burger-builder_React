import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Aux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese:  0.6,
    meat:  1.3,
};

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
    };

    _updateTotalPrice = (ingredient, type, count = 1) => {
        const oldPrice = this.state.totalPrice;

        if (type === 'inc')
            return oldPrice + (INGREDIENT_PRICES[ingredient] * count);
        if (type === 'dec')
            return oldPrice - (INGREDIENT_PRICES[ingredient] * count);
    }

    _getDisabledInfo = () => {
        const ingredients = { ...this.state.ingredients };
        for (let key in ingredients) {
            ingredients[key] = ingredients[key] <= 0;
        }

        return ingredients;
    }
    

    addIngredientHandler = (ingType) => {
        const updatedCount = this.state.ingredients[ingType] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingType] = updatedCount;
        const newPrice = this._updateTotalPrice(ingType, 'inc');
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = (ingType) => {
        const oldCount = this.state.ingredients[ingType];
        if (oldCount <= 0) return;
        
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingType] = updatedCount;

        const newPrice = this._updateTotalPrice(ingType, 'dec');

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }
    

    render() {
        const disabledIngrInfo = this._getDisabledInfo();

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    handleAddIngredient={this.addIngredientHandler}
                    handleRemoveIngredient={this.removeIngredientHandler}
                    disabledIngrInfo={disabledIngrInfo} />
            </Aux>
        )
    }
}
