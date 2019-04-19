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
                value={props.value} 
                onChange={props.onChange} />;
            break;
        case('select'):
            input = (
                <select
                    className={styles.InputElement} 
                    value={props.value} 
                    onChange={props.onChange} >
                    {props.config.options.map(el => (
                        <option 
                            value={el.value}
                            key={el.value} >
                            {el.valueToDisplay}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            input = <input 
                className={styles.InputElement} 
                {...props.config} 
                value={props.value} 
                onChange={props.onChange} />;
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
    onChange: PropTypes.func,
}
export default input;
