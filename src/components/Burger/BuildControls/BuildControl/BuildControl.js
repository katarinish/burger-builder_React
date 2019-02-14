import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={styles.BuildControl} >
            <div className={styles.Label}>{props.label}</div>
            <button
                className={styles.Less}
                onClick={props.removeIngredient} 
                disabled={props.isDisabled} >Less</button>
            <button 
                className={styles.More}
                onClick={props.addIngredient} >More</button>
        </div>
    );
}

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    removeIngredient: PropTypes.func.isRequired,
    addIngredient: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
}

export default buildControl;
