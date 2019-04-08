import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            building: '',
            postalCode: '',
        },
        isLoading: false,
    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);

        this.setState({
            isLoading: true,
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kate Kovylina',
                address: {
                    street: 'Test street',
                    zipCode: 123321,
                    country: 'Russia',
                }
            },
            deliveryMethod: 'fastest',
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    isLoading: false,
                });

                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error sending order request --->', error);
                this.setState({
                    isLoading: false,
                });
            });
    }
    

    render() {
        let form = (
            <form className={styles.DataForm}>
                <input type='text' name='name' placeholder='Your Name'/>
                <input type='text' name='email' placeholder='Your Email'/>
                <input type='text' name='street' placeholder='Your Street'/>
                <input type='text' name='building' placeholder='Your Building'/>
                <input type='text' name='postal' placeholder='Your Postal Code'/>
                <Button
                    click={this.submitOrderHandler}
                    type='Success'>ORDER</Button>
            </form>
        );
        if(this.state.isLoading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h3>Fill in your contact data!</h3>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);
