import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                    burgerIngredients={this.props.ingredients}
                    handleCancelButton={this.cancelCheckoutHandler}
                    handleSuccessButton={this.continueCheckoutHandler} />
                <Route 
                    path={`${this.props.match.url}/contact-data`}
                    render={() => (
                        <ContactData 
                            ingredients={this.props.ingredients}
                            price={this.props.price} />
                    )} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    price: state.price,
})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps)(Checkout);
