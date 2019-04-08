import React, { Component } from 'react';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese:  0.6,
    meat:  1.3,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
    };

    componentDidMount = () => {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: {
                        ...response.data
                    }
                });
                
                this._updatePurchasableState(response.data);
            });
    }
    

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

    _updatePurchasableState = (ingredients) => {
        let totalAmount = 0;

        for (let ing in ingredients) {
            totalAmount += ingredients[ing];
        }

        this.setState({
            purchasable: totalAmount > 0
        })
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

        this._updatePurchasableState(updatedIngredients);
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

        this._updatePurchasableState(updatedIngredients);
    }

    orderBurgerHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    rejectOrderHandler = () => {        
        this.setState({
            purchasing: false,
        });
    }

    purchaseOrderHandler = () => {
        const queryParams = [];
        const ingredients = this.state.ingredients;

        
        for (let ingr in ingredients) {
            queryParams.push(`${encodeURIComponent(ingr)}=${encodeURIComponent(ingredients[ingr])}`);
        }

        queryParams.push(`totalPrice=${this.state.totalPrice}`);

        const search = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search
        });
    }
    
    
    render() {
        const disabledIngrInfo = this._getDisabledInfo();

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients} 
                handleRejectOrder={this.rejectOrderHandler}
                handlePurchaseOrder={this.purchaseOrderHandler}
                price={this.state.totalPrice}/>
        );

        if (this.state.isLoading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        handleAddIngredient={this.addIngredientHandler}
                        handleRemoveIngredient={this.removeIngredientHandler}
                        disabledIngrInfo={disabledIngrInfo} 
                        totalPrice={this.state.totalPrice}
                        isPurchasable={this.state.purchasable}
                        orderBurger={this.orderBurgerHandler} />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal 
                    isShown={this.state.purchasing}
                    handleRejectOrder={this.rejectOrderHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
