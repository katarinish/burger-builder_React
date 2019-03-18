import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.css';

export default class Layout extends Component {
    state = {
        isSideDrawerOpen: false,
    }

    closeSideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpen: false,
        });
    }

    toggleBurgerHandler = () => {
        this.setState((state, props) => { 
            return { 
                isSideDrawerOpen: !state.isSideDrawerOpen
            };
        });
    }
    
    openSideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpen: true,
        });
    }
    

    render() {
        return (
            <Aux>
                <Toolbar handleToggleBurger={this.toggleBurgerHandler}/>
                <SideDrawer 
                    isOpen={this.state.isSideDrawerOpen}
                    handleCloseSideDrawer={this.closeSideDrawerHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
