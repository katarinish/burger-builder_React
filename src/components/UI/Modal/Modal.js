import React, {Component} from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import styles from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        return (this.props.isShown !== nextProps.isShown) ||
        (this.props.children !== nextProps.children);
    }
    

    render() {
        return (
            <Aux>
                <Backdrop
                    isShown={this.props.isShown}
                    click={this.props.handleRejectOrder} />
                <div className={`${styles.Modal}
                ${!this.props.isShown ? styles.hidden : ''}`}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
