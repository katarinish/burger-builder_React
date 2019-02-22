import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem 
                link='/'
                isActive >Burger Builder</NavigationItem>
            <NavigationItem 
                link='/'>Checkout</NavigationItem>
        </ul>
    )
}

export default navigationItems;
