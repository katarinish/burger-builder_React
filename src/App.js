import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));


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
                    component={asyncAuth} />
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
                        component={asyncAuth} />
                    <Route
                        path='/checkout'
                        component={asyncCheckout} />
                    <Route
                        path='/orders'
                        component={asyncOrders} />
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
