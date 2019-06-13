import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import styles from './SideDrawer.css';

const sideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop 
                isShown={props.isOpen}
                click={props.handleCloseSideDrawer}/>
            <div className={`${styles.SideDrawer} ${(props.isOpen) ? styles.isOpen : styles.Closed}`}
                onClick={props.handleCloseSideDrawer}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthorized={props.authorized}/>
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;
