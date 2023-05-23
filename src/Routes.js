import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HomePage from "./Components/HomePage";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/" component={HomePage} />
            {/* Add more routes as needed */}
        </Switch>
    );
};

export default Routes;
