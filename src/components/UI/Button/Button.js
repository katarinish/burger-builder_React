import React from 'react';

import styles from './Button.css';

const button = (props) => {
    return (
        <button 
            onClick={props.click}
            className={`${styles.Button} ${styles[props.type]}`}>
            {props.children}
        </button>
    );
}

export default button;
