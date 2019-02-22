import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger_logo.png';

const logo = (props) => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="Burger Logo"/>
        </div>
    )
}

export default logo;
