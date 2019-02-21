import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

import styles from './Modal.css';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop 
                isShown={props.isShown}
                rejectOrder={props.handleRejectOrder} />
            <div className={`${styles.Modal}
                ${!props.isShown ? styles.hidden : ''}`}>
                {props.children}
            </div>
        </Aux>
    );
}

export default Modal;
