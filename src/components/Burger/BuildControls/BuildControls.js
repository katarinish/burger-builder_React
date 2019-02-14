import React from 'react';
import PropTypes from 'prop-types';


import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const CONTROLS = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={styles.buildControls}>
            <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {CONTROLS.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    addIngredient={() => props.handleAddIngredient(control.type)}
                    removeIngredient={() => props.handleRemoveIngredient(control.type)}
                    isDisabled={props.disabledIngrInfo[control.type]}
                    />
            ))}
            <button 
                className={styles.OrderButton}
                disabled={!props.isPurchasable} >ORDER NOW</button>
        </div>
    );
}

buildControls.propTypes = {
    totalPrice: PropTypes.number,
    isPurchasable: PropTypes.bool.isRequired,
}

export default buildControls;
