import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

const input = (props) => {
    let input = null;

    const classes = [styles.InputElement];
    if (!props.isValid && props.isModified) classes.push(styles.Invalid);
    
    switch(props.type) {
        case ('textarea'):
            input = <textarea 
                className={classes.join(' ')} 
                {...props.config} 
                value={props.value} 
                onChange={props.onChange} />;
            break;
        case('select'):
            input = (
                <select
                    className={classes.join(' ')} 
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
                className={classes.join(' ')} 
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
