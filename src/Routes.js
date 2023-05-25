import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Map from "./Components/Map";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/" component={Map} />
        </Switch>
    );
};

export default Routes;
