import React from 'react';

import styles from './ToggleBurger.css';

const toggleBurger = (props) => {
    return (
        <div 
            className={styles.ToggleBurger}
            onClick={props.handleClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default toggleBurger;
