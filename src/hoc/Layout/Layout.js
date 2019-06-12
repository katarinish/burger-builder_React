import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.css';
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        isSideDrawerOpen: false,
    };

    closeSideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpen: false,
        });
    };

    toggleBurgerHandler = () => {
        this.setState((state, props) => { 
            return { 
                isSideDrawerOpen: !state.isSideDrawerOpen
            };
        });
    };
    
    openSideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpen: true,
        });
    };
    

    render() {
        return (
            <Aux>
                <Toolbar
                    authorized={this.props.isAuthorized}
                    handleToggleBurger={this.toggleBurgerHandler}/>
                <SideDrawer
                    authorized={this.props.isAuthorized}
                    isOpen={this.state.isSideDrawerOpen}
                    handleCloseSideDrawer={this.closeSideDrawerHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.idToken && true,
});

export default connect(mapStateToProps)(Layout);
