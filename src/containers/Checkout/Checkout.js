import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }
    
    componentDidMount = () => {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of queryParams.entries()) {
            console.log(param);
            ingredients[param[0]] = +param[1];
        }

        this.setState({
            ingredients
        });
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    }
    

    render() {
        return (
            <div>
                <CheckoutSummary 
                    burgerIngredients={this.state.ingredients}
                    handleCancelButton={this.cancelCheckoutHandler}
                    handleSuccessButton={this.continueCheckoutHandler} />
                <Route 
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;
