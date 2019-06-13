import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.css';

const navigationItems = (props) => {
    const auth = props.isAuthorized ? (
        <NavigationItem link='/logout' >Log Out</NavigationItem>
    ):(
        <NavigationItem link='/auth' >Authenticate</NavigationItem>
    );

    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/' >Burger Builder</NavigationItem>
            {props.isAuthorized ? <NavigationItem link='/orders' > My Orders</NavigationItem> : null}
            {auth}
        </ul>
    )
};

export default navigationItems;
