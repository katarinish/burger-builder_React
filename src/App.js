import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
        let routes = (
            <Switch>
                <Route
                    exact
                    path='/'
                    component={BurgerBuilder} />
                <Route
                    path='/auth'
                    component={Auth} />
                <Redirect to={'/'}/>
            </Switch>
        );

        if (this.props.isAuthorized) {
            routes = (
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
                    <Redirect to={'/'}/>
                </Switch>
            );
        }

        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        {routes}
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
    checkAuthState: () => dispatch(actions.checkAuthentificationState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
