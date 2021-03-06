import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };

    continueCheckoutHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    };

    render() {
        let summary = (
            <CheckoutSummary 
                burgerIngredients={this.props.ingredients}
                handleCancelButton={this.cancelCheckoutHandler}
                handleSuccessButton={this.continueCheckoutHandler} />
        );
        if (!this.props.ingredients || !this.props.isPurchasing) {
            summary = <Redirect to='/' />;
        }

        return (
            <div>
               {summary}
                <Route 
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isPurchasing: state.order.isPurchasing,
    }
};

export default connect(mapStateToProps)(Checkout);
