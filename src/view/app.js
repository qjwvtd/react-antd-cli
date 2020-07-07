import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//router
import routerHistory from '@/common/router';
//全局顶层模块
import Home from './home';
import Main from './main';
import Register from './user/register';
import Login from './user/login';
import SetPassword from './user/setPassword';


export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        return (
            <Router history={routerHistory}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/setPassword" component={SetPassword} />
                    <Route path="/main" component={Main} />
                </Switch>
            </Router>
        );
    }
}