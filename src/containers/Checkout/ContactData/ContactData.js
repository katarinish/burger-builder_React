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
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
            email: {
                config: {
                    type: 'text',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
            street: {
                config: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
            building: {
                config: {
                    type: 'text',
                    placeholder: 'Building',
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
            postalCode: {
                config: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
                validation: {
                    isRequired: true,
                    isNumber: true,
                },
                isValid: false,
                isTouched: false,
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [
                        {value: 'fastest', valueToDisplay: 'Fastest'},
                        {value: 'cheapest', valueToDisplay: 'Cheapest'}
                    ]
                },
                validation: {
                    isRequired: true,
                },
                value: 'fastest',
                isValid: false,
                isTouched: false,
            }
        },
        isLoading: false,
    }

    isValid = (value, rules) => {
        let isValidValue = true;

        if (rules.isRequired) {
            isValidValue = value.trim() !== '' && isValidValue;
        }

        if (rules.isNumber) {
            isValidValue = isValidValue && (parseInt(value, 10).toString() === value)
        }

        return isValidValue;
    }
    

    submitOrderHandler = (event) => {
        event.preventDefault();

        let userData = {};
        const orderForm = this.state.orderForm;
        for (let inputType in orderForm) {
            userData[inputType] = orderForm[inputType].value;

            if (!orderForm[inputType].isValid) return;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userData,
        }

        this.setState({
            isLoading: true,
        });

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

    onInputChangeHandler = (elType, event) => {
        let modifiedForm = JSON.parse(JSON.stringify(this.state.orderForm));
        const elementConfig = modifiedForm[elType];
        elementConfig.value = event.target.value;
        elementConfig.isValid = this.isValid(event.target.value, elementConfig.validation);
        elementConfig.isTouched = true;

        this.setState({
            orderForm: modifiedForm
        });
    }
    
    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            let elemConfig = this.state.orderForm[key];
            let element = (
                <Input 
                    key={key}
                    type={elemConfig.type}
                    config={elemConfig.config}
                    value={elemConfig.value} 
                    isValid={elemConfig.isValid}
                    isModified={elemConfig.isTouched}
                    onChange={(event) => this.onInputChangeHandler(key, event)}/>
            );

            formElements.push(element);
        }

        if (this.state.isLoading) {
            formElements = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h3>Fill in your contact data!</h3>
                <form 
                    className={styles.DataForm}
                    onSubmit={this.submitOrderHandler}
                    >
                    {formElements}
                    <Button type='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default withRouter(ContactData);
