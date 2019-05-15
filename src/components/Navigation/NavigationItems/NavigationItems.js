import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem 
                link='/' >Burger Builder</NavigationItem>
            <NavigationItem 
                link='/checkout' >Checkout</NavigationItem>
            <NavigationItem
                link='/orders' >My Orders</NavigationItem>
            <NavigationItem
                link='/auth' >Authenticate</NavigationItem>
        </ul>
    )
}

export default navigationItems;
