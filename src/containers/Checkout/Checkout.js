import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingredients: null,
        price: 0,
    }
    
    componentWillMount = () => {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        let price = 0;

        for (let param of queryParams.entries()) {
            if (param[0] === 'totalPrice') {
                price = +param[1];

                continue;
            }

            ingredients[param[0]] = +param[1];
        }

        this.setState({
            ingredients,
            price
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
                    render={() => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            price={this.state.price} />
                    )} />
            </div>
        )
    }
}

export default Checkout;
