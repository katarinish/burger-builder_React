import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.initOrders(this.props.authToken);
    };

    render() {
        let orders = <Spinner />;
        if (!this.props.isFetching) {
            orders = this.props.orders.map((order, index) => {
                const price = +order.price;
                const ingredients = order.ingredients;
                const delivery = order.userData.deliveryMethod;

                return (
                    <Order 
                        ingredients={ingredients}
                        price={price}
                        delivery={delivery}
                        key={`${index}${delivery}${price}`}/>
                );
            });
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.order.isLoading,
    orders: state.order.orders,
    authToken: state.auth.idToken,
});

const mapDispatchToProps = (dispatch) => ({
    initOrders: (token) => dispatch(actions.initOrders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
