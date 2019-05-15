import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Auth.css';

import * as actions from '../../store/actions/';

class Auth extends Component {
    state = {
        controls: {
            email: {
                config: {
                    type: 'text',
                    placeholder: 'Your e-mail',
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
            password: {
                config: {
                    type: 'text',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                isValid: false,
                isTouched: false,
            },
        },
        isSignUpMode: true,
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

    onInputChangeHandler = (elType, event) => {
        let modifiedForm = JSON.parse(JSON.stringify(this.state.controls));
        const elementConfig = modifiedForm[elType];
        elementConfig.value = event.target.value;
        elementConfig.isValid = this.isValid(event.target.value, elementConfig.validation);
        elementConfig.isTouched = true;

        this.setState({
            controls: modifiedForm
        });
    }

    submitFormHandler = (event) => {
        event.preventDefault();

        let authData = {};
        const orderForm = this.state.controls;
        for (let inputType in orderForm) {
            authData[inputType] = orderForm[inputType].value;

            if (!orderForm[inputType].isValid) return;
        }

        authData.isSignUpMode = this.state.isSignUpMode;
        this.props.onSubmitFormHandler(authData);
    }

    clickButtonHandler = () => {
        this.setState(prevState => ({
            isSignUpMode: !prevState.isSignUpMode,
        }));
    }

    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            let elemConfig = this.state.controls[key];
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

        return (
            <div className={styles.Auth}>
                <form 
                    onSubmit={this.submitFormHandler} >
                    {formElements}
                    <Button 
                        type='Success' >Submit</Button>
                </form>
                <Button 
                    type='Danger'
                    click={this.clickButtonHandler}>
                    Switch to {this.state.isSignUpMode ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitFormHandler: (authData) => dispatch(actions.authenticate(authData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);