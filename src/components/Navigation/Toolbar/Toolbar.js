import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleBurger from '../SideDrawer/ToggleBurger/ToggleBurger';

import styles from './Toolbar.css';
 
const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <ToggleBurger handleClick={props.handleToggleBurger}/>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    ) 
}

export default toolbar;
