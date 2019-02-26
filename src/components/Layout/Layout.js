import React, {Component} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import styles from './Layout.css';

export default class Layout extends Component {
    state ={
        isSideDrawerOpen: true,
    }

    closeSideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpen: false,
        });
    }
    
    
    openSideDrawerHandler = () => {
    
    }
    

    render() {
        return (
            <Aux>
                <Toolbar />
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
