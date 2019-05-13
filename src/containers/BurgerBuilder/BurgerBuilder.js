import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actionCreators from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        isLoading: false,
    };

    componentDidMount = () => {
        this.props.initIngredientsHandler();
    }

    _getDisabledInfo = () => {
        const ingredients = { ...this.props.ingredients };
        for (let key in ingredients) {
            ingredients[key] = ingredients[key] <= 0;
        }

        return ingredients;
    }

    isPurchasable = () => {
        let totalAmount = 0;
        const ingredients = this.props.ingredients;
        for (let ing in ingredients) {
            totalAmount += ingredients[ing];
        }

        return totalAmount > 0;
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
        this.props.history.push('/checkout');
    }
    
    render() {
        const disabledIngrInfo = this._getDisabledInfo();

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients} 
                handleRejectOrder={this.rejectOrderHandler}
                handlePurchaseOrder={this.purchaseOrderHandler}
                price={this.props.totalPrice}/>
        );

        if (this.state.isLoading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if (this.props.isError) {
            burger = <h2>Ingredients cant be loaded</h2>;
        } else if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        handleAddIngredient={this.props.onAddIngredient}
                        handleRemoveIngredient={this.props.onRemoveIngredient}
                        disabledIngrInfo={disabledIngrInfo} 
                        totalPrice={this.props.totalPrice}
                        isPurchasable={this.isPurchasable()}
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
                {burger}:;
            </Aux>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.price,
    isError: state.isError,
});

const mapDispatchToProps = (dispatch) => ({
    onAddIngredient: (ingType) => dispatch(actionCreators.addIngredient(ingType)),
    onRemoveIngredient: (ingType) => dispatch(actionCreators.removeIngredient(ingType)),
    initIngredientsHandler: () => dispatch(actionCreators.initIngredients()),
});


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
