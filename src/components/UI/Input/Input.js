import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

const input = (props) => {
    let input = null;
    
    switch(props.type) {
        case ('textarea'):
            input = <textarea 
                className={styles.InputElement} 
                {...props.config} 
                value={props.value} />;
            break;
        default:
            input = <input 
                className={styles.InputElement} 
                {...props.config} 
                value={props.value} />;
    }

    return (
        <div className={styles.Input} >
            <label className={styles.Label}>{props.label}</label>
            {input}
        </div>
    )
}

input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    config: PropTypes.object,
    value: PropTypes.string,
}
export default input;
