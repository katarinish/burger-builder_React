import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
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
            </div>
        )
    }
}

export default Checkout;
