import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {

    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route 
                                exact
                                path='/'
                                component={BurgerBuilder} />
                            <Route 
                                path='/auth'
                                component={Auth} />
                            <Route 
                                path='/checkout'
                                component={Checkout} />
                            <Route 
                                path='/orders'
                                component={Orders} />
                            <Route
                                path='/logout'
                                component={Logout} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkAuthState: () => dispatch(actions.checkAuthentificationState()),
});

export default connect(null, mapDispatchToProps)(App);
