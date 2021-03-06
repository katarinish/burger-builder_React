import React from 'react';
import styles from './Backdrop.css';

const backdrop = (props) => {
    return props.isShown ? (<div 
        className={styles.Backdrop}
        onClick={props.click }></div>): null;
}

export default backdrop;
