import React from 'react';

import styles from './Modal.css';

const Modal = (props) => {
    return (
        <div 
            className={`${styles.Modal} ${!props.isShown ? styles.hidden : ''}`}>
            {props.children}
        </div>
    );
}

export default Modal;
