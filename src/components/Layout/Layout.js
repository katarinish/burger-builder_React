import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';

import styles from './Layout.css';

const Layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;
