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
                    type={control.type} />
            ))}
        </div>
    );
}

export default buildControls;
