import React, { Component } from 'react';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        isFetching: true
    }
    componentDidMount = () => {
        axios.get('/orders.json')
            .then(response => {
                console.log(response);
                this.setState({
                    orders: [
                        ...Object.values(response.data)
                    ],
                    isFetching: false,
                });
            })
            .catch(error => {
                console.log('Error fetching existing orders --->', error);
                this.setState({
                    isFetching: false,
                });
            });
    }
    

    render() {
        let orders = <Spinner />;
        if (!this.state.isFetching) {
            orders = this.state.orders.map((order, index) => {
                console.log(order);
                const price = +order.price;
                const ingredients = order.ingredients;
                const delivery = order.deliveryMethod;

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

export default withErrorHandler(Orders, axios);
