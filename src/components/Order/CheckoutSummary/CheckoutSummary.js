import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>

            <div className={styles['Burger-container']}>
                <Burger ingredients={props.burgerIngredients}/>
            </div>

            <Button 
                type='Danger'
                click={props.handleCancelButton} >Cancel</Button>
            <Button 
                type='Success'
                click={props.handleSuccessButton}>Continue</Button>
        </div>
    );
}

checkoutSummary.propTypes = {
    burgerIngredients: PropTypes.object,
    handleCancelButton: PropTypes.func,
    handleSuccessButton: PropTypes.func,
}

export default checkoutSummary;
