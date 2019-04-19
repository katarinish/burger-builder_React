import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                config: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
            },
            email: {
                config: {
                    type: 'text',
                    placeholder: 'Your Email',
                },
                value: '',
            },
            street: {
                config: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            building: {
                config: {
                    type: 'text',
                    placeholder: 'Building',
                },
                value: '',
            },
            postalCode: {
                config: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [
                        {value: 'fastest', valueToDisplay: 'Fastest'},
                        {value: 'cheapest', valueToDisplay: 'Cheapest'}
                    ]
                },
                value: '',
            }
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
        let formElements = [];
        for (let key in this.state.orderForm) {
            let elemConfig = this.state.orderForm[key];
            let element = (
                <Input 
                    key={`${key}${elemConfig.value}`}
                    type={elemConfig.type}
                    config={elemConfig.config}
                    value={elemConfig.value} />
            );

            formElements.push(element);
        }

        if(this.state.isLoading) {
            formElements = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h3>Fill in your contact data!</h3>
                <form className={styles.DataForm}>
                    {formElements}
                </form>
            </div>
        );
    }
}

export default withRouter(ContactData);
