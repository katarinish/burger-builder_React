import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={styles.buildControls}>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    addIngredient={() => props.handleAddIngredient(control.type)}
                    removeIngredient={() => props.handleRemoveIngredient(control.type)}
                    isDisabled={props.disabledIngrInfo[control.type]}
                    />
            ))}
        </div>
    );
}

export default buildControls;
